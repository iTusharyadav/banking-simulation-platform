package banking.simulationplatform.service;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Transaction;

/**
 * Business interface for managing fund transfers and related transactions.
 */
public interface FundTransferService {

    Transaction save(Transaction transaction);

    BankAccount updateFundDeduction(BankAccount bankAccount);
}
