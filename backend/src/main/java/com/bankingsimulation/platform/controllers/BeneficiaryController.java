package banking.simulationplatform.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import banking.simulationplatform.model.BankAccount;
import banking.simulationplatform.model.Beneficiaries;
import banking.simulationplatform.model.User;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.service.AccountService;
import banking.simulationplatform.service.BeneficiariesService;
import banking.simulationplatform.service.SignUpService;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller for managing user beneficiaries.
 * Users can add, update, delete and view their saved beneficiary accounts.
 */
@Slf4j
@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    @Autowired
    private BeneficiariesService beneficiariesService;

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserRepository userRepo;

    /**
     * Add a new beneficiary.
     */
    @PostMapping("/add")
    public ResponseEntity<Beneficiaries> createBeneficiary(@RequestBody Beneficiaries beneficiary) {
        Beneficiaries newBeneficiary = beneficiariesService.createBeneficiary(beneficiary);
        return new ResponseEntity<>(newBeneficiary, HttpStatus.CREATED);
    }

    /**
     * Create and link a beneficiary to a specific user.
     */
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> saveBeneficiary(@RequestBody Beneficiaries beneficiary, @PathVariable String userId) {

        if (accountService.findByAccountNo(beneficiary.getBeneaccountno()) == null)
            return new ResponseEntity<>("Account does not exist", HttpStatus.NOT_FOUND);

        List<BankAccount> accounts = accountService.findByUserId(userId);
        for (BankAccount acc : accounts) {
            if (acc.getAccountno() == beneficiary.getBeneaccountno())
                return new ResponseEntity<>("You cannot add your own account as beneficiary", HttpStatus.BAD_REQUEST);
        }

        List<Beneficiaries> existing = beneficiariesService.getBeneficiariesByUserId(userId);
        if (existing != null) {
            for (Beneficiaries ben : existing) {
                if (ben.getBeneaccountno() == beneficiary.getBeneaccountno())
                    return new ResponseEntity<>("Beneficiary already exists", HttpStatus.CONFLICT);
            }
        }

        return new ResponseEntity<>(beneficiariesService.createBeneficiaries(beneficiary, userId), HttpStatus.OK);
    }

    /**
     * Get all beneficiaries in the system (admin only).
     */
    @GetMapping("/all")
    public ResponseEntity<List<Beneficiaries>> getAllBeneficiaries() {
        return new ResponseEntity<>(beneficiariesService.getAllBeneficiaries(), HttpStatus.OK);
    }

    /**
     * Get a single beneficiary by ID.
     */
    @GetMapping("/{beneficiaryId}")
    public ResponseEntity<Beneficiaries> getBeneficiaryById(@PathVariable int beneficiaryId) {
        return new ResponseEntity<>(beneficiariesService.getBeneficiaryById(beneficiaryId), HttpStatus.OK);
    }

    /**
     * Update an existing beneficiary for a given user.
     */
    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateBeneficiary(@RequestBody Beneficiaries beneficiary, @PathVariable String userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null)
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        List<BankAccount> accounts = accountService.findByUserId(userId);
        for (BankAccount acc : accounts) {
            if (acc.getAccountno() == beneficiary.getBeneaccountno())
                return new ResponseEntity<>("You cannot add your own account as beneficiary", HttpStatus.BAD_REQUEST);
        }

        beneficiary.setUser(user);
        return new ResponseEntity<>(beneficiariesService.updateBeneficiary(beneficiary), HttpStatus.OK);
    }

    /**
     * Delete a beneficiary by ID.
     */
    @DeleteMapping("/delete/{beneficiaryId}")
    public ResponseEntity<Void> deleteBeneficiary(@PathVariable int beneficiaryId) {
        beneficiariesService.deleteBeneficiary(beneficiaryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Get all beneficiaries linked to a specific user.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Beneficiaries>> getBeneficiariesByUserId(@PathVariable String userId) {
        return new ResponseEntity<>(beneficiariesService.getBeneficiariesByUserId(userId), HttpStatus.OK);
    }
}
