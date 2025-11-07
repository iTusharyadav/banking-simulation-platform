package banking.simulationplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Transactions;
import banking.simulationplatform.repository.TransactionRepository;
import banking.simulationplatform.service.FundTransferService;

@Service
public class FundTransferServiceImpl implements FundTransferService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transactions save(Transactions transactions) {
        return transactionRepository.save(transactions);
    }

    @Override
    public BankAccount updateFundDeducion(BankAccount bankAccount) {
        // TODO: Implement logic for fund deduction
        return null;
    }
}
