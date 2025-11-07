package banking.simulationplatform.service;

/**
 * Business interface for deposit-related operations.
 */
public interface DepositService {

    void saveDeposit(long accountNo, double amount);

    void updateFundDeposit(long accountNo, double amount);
}
