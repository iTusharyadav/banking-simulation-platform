package com.bankingsimulation.platform.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankingsimulation.platform.model.BankAccount;
import com.bankingsimulation.platform.model.Transactions;
import com.bankingsimulation.platform.model.User;
import com.bankingsimulation.platform.service.AccountService;
import com.bankingsimulation.platform.service.SignUpService;
import com.bankingsimulation.platform.service.TransactionService;
import com.bankingsimulation.platform.util.Helper;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private SignUpService signUpService;

    /**
     * Fetch account details by account number.
     */
    @GetMapping("/{accountNo}")
    public ResponseEntity<?> getAccountDetails(@PathVariable long accountNo) {
        BankAccount account = accountService.findByAccountNo(accountNo);
        if (account != null) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
    }

    /**
     * Get all users with or without accounts based on flag.
     * 0 = With Accounts, 1 = Without Accounts, 2 = All Users
     */
    @GetMapping("/list/{flag}")
    public ResponseEntity<?> getAccountsList(@PathVariable int flag) {
        List<User> users = signUpService.GetAllUsers();
        List<User> filtered = new ArrayList<>();

        switch (flag) {
            case 0 -> users.forEach(u -> {
                if (!u.getAccounts().isEmpty()) filtered.add(u);
            });
            case 1 -> users.forEach(u -> {
                if (u.getAccounts().isEmpty()) filtered.add(u);
            });
            case 2 -> filtered.addAll(users);
            default -> {
                return ResponseEntity.badRequest().body("Invalid flag");
            }
        }
        return ResponseEntity.ok(filtered);
    }

    /**
     * Find account details by user email.
     */
    @GetMapping("/by-email")
    public ResponseEntity<?> getAccountByEmail(@Param("email") String email) {
        User user = signUpService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    /**
     * Get all users requesting account opening.
     */
    @GetMapping("/requests")
    public ResponseEntity<?> getAllAccountRequests() {
        List<User> users = signUpService.GetAllUsers();
        List<User> pending = new ArrayList<>();

        for (User u : users) {
            boolean hasAccounts = !accountService.findByUserId(u.getUserId()).isEmpty();
            if (!hasAccounts && u.isAccountopenningreq()) {
                pending.add(u);
            }
        }
        return ResponseEntity.ok(pending);
    }

    /**
     * Create a new bank account for a user.
     */
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createAccount(@RequestBody BankAccount bankAccount, @PathVariable String userId) {
        User user = signUpService.getAUser(userId).orElse(null);
        if (user == null || !user.isAccountopenningreq()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account creation not allowed");
        }

        List<BankAccount> existingAccounts = accountService.findByUserId(userId);
        for (BankAccount acc : existingAccounts) {
            if (acc.getAccountType().equalsIgnoreCase(bankAccount.getAccountType())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Account type already exists");
            }
        }

        BankAccount newAccount = new BankAccount();
        newAccount.setAccountType(bankAccount.getAccountType());
        newAccount.setBalance(10000.00);
        newAccount.setIsactive(true);

        long accountNo;
        do {
            accountNo = Helper.generateAccountNo();
        } while (!accountService.validateAccNo(accountNo));

        newAccount.setAccountno(accountNo);
        newAccount.setDateCreated(Helper.dateStamp());
        newAccount.setTimeCreated(Helper.timeStamp());

        return ResponseEntity.ok(accountService.createAccount(newAccount, userId));
    }

    /**
     * Delete an account (only if balance is zero).
     */
    @DeleteMapping("/{accountNo}")
    public ResponseEntity<?> deleteAccount(@PathVariable long accountNo) {
        BankAccount account = accountService.findByAccountNo(accountNo);
        if (account == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");

        if (account.getBalance() > 0)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Balance must be zero before deletion");

        accountService.deleteAccount(accountNo);
        return ResponseEntity.ok("Account deleted successfully");
    }

    /**
     * Suspend or activate an account.
     */
    @PutMapping("/{accountNo}/status/{status}")
    public ResponseEntity<?> updateAccountStatus(@PathVariable long accountNo, @PathVariable String status) {
        BankAccount account = accountService.findByAccountNo(accountNo);
        if (account == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");

        boolean activate = "activate".equalsIgnoreCase(status);
        account.setIsactive(activate);
        accountService.updateAccount(account);
        return ResponseEntity.ok("Account " + (activate ? "activated" : "suspended"));
    }

    /**
     * Fixed Deposit simulation.
     */
    @PostMapping("/fixed-deposit")
    public ResponseEntity<?> fixedDeposit(@RequestBody BankAccount bankAccount) {
        BankAccount account = accountService.findByAccountNo(bankAccount.getAccountno());
        if (account == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");

        if (account.getBalance() > 0)
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account already has funds");

        account.setBalance(bankAccount.getBalance());
        accountService.updateAccount(account);

        Transactions txn = new Transactions();
        txn.setFromAccount(99999999L);
        txn.setToAccount(account.getAccountno());
        txn.setAmount(account.getBalance());
        txn.setDescription("Fixed Deposit");
        txn.setTransactionStatus("Completed");
        txn.setTransactionDate(Helper.dateStamp());
        txn.setTransactionTime(Helper.timeStamp());
        transactionService.save(txn);

        return ResponseEntity.ok(account);
    }

    /**
     * Check account balance.
     */
    @GetMapping("/balance/{accountNo}")
    public ResponseEntity<?> checkBalance(@PathVariable long accountNo) {
        BankAccount account = accountService.findByAccountNo(accountNo);
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }
        return ResponseEntity.ok(account);
    }
}
