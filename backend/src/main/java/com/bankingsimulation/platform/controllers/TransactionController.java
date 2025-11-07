package banking.simulationplatform.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import banking.simulationplatform.model.Transactions;
import banking.simulationplatform.service.TransactionService;
import lombok.extern.slf4j.Slf4j;

/**
 * Handles all transaction-related endpoints.
 * Provides APIs to view, filter, and fetch transaction history.
 */
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    /**
     * Get all transactions in the system.
     */
    @GetMapping
    public ResponseEntity<List<Transactions>> getAllTransactions() {
        List<Transactions> transactions = transactionService.findAll();
        if (transactions == null || transactions.isEmpty()) {
            log.warn("No transactions found in system");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        log.info("Fetched {} transactions", transactions.size());
        return ResponseEntity.ok(transactions);
    }

    /**
     * Get all transactions where given account is the sender.
     */
    @GetMapping("/sender/{accountId}")
    public ResponseEntity<List<Transactions>> getBySender(@PathVariable long accountId) {
        List<Transactions> list = transactionService.getDetailsByAccount(accountId);
        if (list == null || list.isEmpty()) {
            log.warn("No sent transactions found for account {}", accountId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(list);
    }

    /**
     * Get all transactions where given account is the receiver.
     */
    @GetMapping("/receiver/{accountId}")
    public ResponseEntity<List<Transactions>> getByReceiver(@PathVariable long accountId) {
        List<Transactions> list = transactionService.getTransactionsByReceiver(accountId);
        if (list == null || list.isEmpty()) {
            log.warn("No received transactions found for account {}", accountId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(list);
    }

    /**
     * Get all transactions (both incoming/outgoing) for a given account.
     */
    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<List<Transactions>> getAllByAccount(@PathVariable long accountNumber) {
        List<Transactions> transactions = transactionService.getAllByAccount(accountNumber);
        if (transactions == null || transactions.isEmpty()) {
            log.warn("No transactions found for account {}", accountNumber);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(transactions);
    }

    /**
     * Get transaction details by transaction ID.
     */
    @GetMapping("/{transactionId}")
    public ResponseEntity<Transactions> getTransactionById(@PathVariable int transactionId) {
        Transactions transaction = transactionService.getTransactionsById(transactionId);
        if (transaction == null) {
            log.warn("Transaction not found for ID {}", transactionId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(transaction);
    }
}
