package banking.simulationplatform.service;

import java.util.List;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Transaction;

public interface TransactionService {
    List<Transaction> getDetailsByAccount(long fromAccount);
    List<Transaction> getTransactionsByReceiver(long toAccount);
    Transaction save(Transaction transaction);
    Transaction setTransaction(BankAccount bankAccount, long toAccount, double amount, String description, String status);
    Transaction getTransactionById(int transactionId);
    List<Transaction> findAll();
    List<Transaction> getAllByAccount(long accountNo);
    Transaction getCurrentTransaction(long accountNo);
}
