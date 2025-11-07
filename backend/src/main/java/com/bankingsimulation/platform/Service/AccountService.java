package banking.simulationplatform.service;

import banking.simulationplatform.model.BankAccount;
import java.util.List;

/**
 * Business interface for managing bank accounts.
 */
public interface AccountService {

    BankAccount findByAccountNo(long accountNo);

    List<BankAccount> findAll();

    BankAccount saveAccount(BankAccount bankAccount);

    void updateAccount(BankAccount bankAccount);

    void deleteAccount(BankAccount bankAccount);

    boolean validateAccNo(long accountNo);

    BankAccount deleteAccount(long accountNo);

    List<BankAccount> createAccount(BankAccount newAccount, String userId);

    List<BankAccount> findByUserId(String userId);
}
