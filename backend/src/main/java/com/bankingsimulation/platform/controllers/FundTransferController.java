package banking.simulationplatform.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Transactions;
import banking.simulationplatform.service.AccountService;
import banking.simulationplatform.service.BeneficiariesService;
import banking.simulationplatform.service.TransactionService;
import banking.simulationplatform.helper.Helper;
import lombok.extern.slf4j.Slf4j;

/**
 * Handles fund transfers between accounts and beneficiaries.
 */
@Slf4j
@RestController
@RequestMapping("/api/fund")
public class FundTransferController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private BeneficiariesService beneficiariesService;

    /**
     * Transfer funds between two accounts.
     */
    @PostMapping("/transfer")
    public ResponseEntity<?> transferFunds(
            @RequestBody BankAccount senderAccount,
            @Param("toAccount") Long toAccount,
            @Param("amount") double amount,
            @Param("description") String description) {

        log.info("Initiating fund transfer from account {} to {}", senderAccount.getAccountno(), toAccount);

        BankAccount sender = accountService.findByAccountNo(senderAccount.getAccountno());
        if (sender == null)
            return new ResponseEntity<>("Sender account not found", HttpStatus.NOT_FOUND);

        if (!sender.isIsactive())
            return declineTransaction(sender, toAccount, amount, description, "Account Inactive");

        if (sender.getBalance() < amount)
            return declineTransaction(sender, toAccount, amount, description, "Insufficient Balance");

        BankAccount receiver = accountService.findByAccountNo(toAccount);
        if (receiver == null)
            return new ResponseEntity<>("Receiver account not found", HttpStatus.NOT_FOUND);

        // Perform transfer
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        Transactions transaction = new Transactions();
        transaction.setFromAccount(sender.getAccountno());
        transaction.setToAccount(receiver.getAccountno());
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setTransactionDate(Helper.dateStamp());
        transaction.setTransactionTime(Helper.timeStamp());
        transaction.setTransactionStatus("Completed");

        accountService.updateAccount(sender);
        accountService.updateAccount(receiver);
        transactionService.save(transaction);

        log.info("Transfer successful: {} -> {} | Amount: {}", sender.getAccountno(), receiver.getAccountno(), amount);

        return new ResponseEntity<>(transactionService.getCurrentTransaction(sender.getAccountno()), HttpStatus.OK);
    }

    /**
     * Transfer funds to a saved beneficiary.
     */
    @PostMapping("/transfer/beneficiary/{benId}")
    public ResponseEntity<?> transferToBeneficiary(
            @RequestBody BankAccount senderAccount,
            @PathVariable int benId,
            @Param("amount") double amount,
            @Param("description") String description) {

        BankAccount receiver = accountService
                .findByAccountNo(beneficiariesService.getBeneficiaryById(benId).getBeneaccountno());
        BankAccount sender = accountService.findByAccountNo(senderAccount.getAccountno());

        if (receiver == null || sender == null)
            return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);

        if (!sender.isIsactive())
            return declineTransaction(sender, receiver.getAccountno(), amount, description, "Account Inactive");

        if (sender.getBalance() < amount)
            return declineTransaction(sender, receiver.getAccountno(), amount, description, "Insufficient Balance");

        // Perform beneficiary transfer
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        Transactions transaction = new Transactions();
        transaction.setFromAccount(sender.getAccountno());
        transaction.setToAccount(receiver.getAccountno());
        transaction.setAmount(amount);
        transaction.setDescription("Beneficiary Transfer: " + description);
        transaction.setTransactionDate(Helper.dateStamp());
        transaction.setTransactionTime(Helper.timeStamp());
        transaction.setTransactionStatus("Completed");

        accountService.updateAccount(sender);
        accountService.updateAccount(receiver);
        transactionService.save(transaction);

        log.info("Beneficiary transfer successful: {} -> {} | Amount: {}", sender.getAccountno(),
                receiver.getAccountno(), amount);

        return new ResponseEntity<>(transactionService.getCurrentTransaction(sender.getAccountno()), HttpStatus.OK);
    }

    /**
     * Helper method to handle declined transactions.
     */
    private ResponseEntity<?> declineTransaction(BankAccount sender, Long toAccount, double amount, String desc,
            String reason) {
        Transactions t = new Transactions();
        t.setFromAccount(sender.getAccountno());
        t.setToAccount(toAccount);
        t.setAmount(amount);
        t.setDescription(desc);
        t.setTransactionDate(Helper.dateStamp());
        t.setTransactionTime(Helper.timeStamp());
        t.setTransactionStatus(reason);
        transactionService.save(t);
        log.warn("Transaction declined: {} -> {} | Reason: {}", sender.getAccountno(), toAccount, reason);
        return new ResponseEntity<>(transactionService.getCurrentTransaction(sender.getAccountno()),
                HttpStatus.NOT_ACCEPTABLE);
    }
}
