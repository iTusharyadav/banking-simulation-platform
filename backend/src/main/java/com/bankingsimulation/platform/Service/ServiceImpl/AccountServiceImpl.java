package banking.simulationplatform.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.User;
import banking.simulationplatform.repository.BankAccountRepository;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired 
    private UserRepository userRepository;

    @Override
    public BankAccount findByAccountNo(long accountNo) {
        return bankAccountRepository.findByAccountNo(accountNo);
    }

    @Override
    public List<BankAccount> findAll() {
        return bankAccountRepository.findAll();
    }

    @Override
    public BankAccount saveAccount(BankAccount bankAccount) {
        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public void updateAccount(BankAccount bankAccount) {
        BankAccount account = bankAccountRepository.findByAccountNo(bankAccount.getAccountno());
        if (account != null) {
            account.setActive(bankAccount.isActive());
            account.setBalance(bankAccount.getBalance());
            bankAccountRepository.save(account);
        }
    }

    @Override
    public void deleteAccount(BankAccount bankAccount) {
        bankAccountRepository.deleteById(bankAccount.getAccountno());
    }

    @Override
    public boolean validateAccNo(long accountNo) {
        return !bankAccountRepository.existsById(accountNo);
    }

    @Override
    public BankAccount deleteAccount(long accountNo) {
        BankAccount temp = bankAccountRepository.findByAccountNo(accountNo);
        bankAccountRepository.deleteById(accountNo);
        return temp;
    }

    @Override
    public List<BankAccount> createAccount(BankAccount newAccount, String userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<BankAccount> existingAccounts = bankAccountRepository.findAllByUserId(userId);
        existingAccounts.add(newAccount);
        user.setAccounts(existingAccounts);
        User updatedUser = userRepository.save(user);
        return updatedUser.getAccounts();
    }

    @Override
    public List<BankAccount> findByUserId(String userId) {
        return bankAccountRepository.findAllByUserId(userId);
    }
}
