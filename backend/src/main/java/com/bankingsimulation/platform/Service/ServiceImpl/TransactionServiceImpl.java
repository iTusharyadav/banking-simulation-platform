package banking.simulationplatform.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Transactions;
import banking.simulationplatform.repository.TransactionRepository;
import banking.simulationplatform.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Transactions> getDetailsByAccount(long fromAccount) {
        return transactionRepository.getDetailsByAccountNo(fromAccount);
    }

    @Override
    public List<Transactions> getTransactionsByReceiver(long toAccount) {
        return transactionRepository.getTransactionsByToAccount(toAccount);
    }

    @Override
    public Transactions save(Transactions transaction) {
        transactionRepository.save(transaction);
        return transactionRepository.getCurrentTransaction(transaction.getToAccount());
    }

    @Override
    public Transactions setTransactions(BankAccount bankAccount, long toAccount, double amount, String description, String status) {
        Transactions newTransaction = new Transactions();
        newTransaction.setFromAccount(bankAccount.getAccountno());
        newTransaction.setToAccount(toAccount);
        newTransaction.setAmount(amount);
        newTransaction.setDescription(description);
        newTransaction.setTransactionStatus(status);
        transactionRepository.save(newTransaction);
        return transactionRepository.getTransactionsByFromAccount(bankAccount.getAccountno());
    }

    @Override
    public Transactions getTransactionsById(int transactionId) {
        return transactionRepository.findById(transactionId).orElse(null);
    }

    @Override
    public List<Transactions> findAll() {
        return transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "transactionDate", "transactionTime"));
    }

    @Override
    public List<Transactions> getAllByAccount(long accountno) {
        return transactionRepository.getByAccount(accountno);
    }

    @Override
    public Transactions getCurrentTransaction(long accountno) {
        return transactionRepository.getCurrentTransaction(accountno);
    }
}
