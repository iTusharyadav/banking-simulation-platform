package banking.simulationplatform.service.impl;

import org.springframework.stereotype.Service;
import banking.simulationplatform.service.DepositService;

@Service
public class DepositServiceImpl implements DepositService {

    @Override
    public void saveDeposit(long accountNo, double balance) {
        throw new UnsupportedOperationException("saveDeposit() not yet implemented");
    }

    @Override
    public void updateFundDeposit(long accountNo, double balance) {
        throw new UnsupportedOperationException("updateFundDeposit() not yet implemented");
    }
}
