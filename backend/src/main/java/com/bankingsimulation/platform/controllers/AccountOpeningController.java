package com.bankingsimulation.platform.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankingsimulation.platform.model.User;
import com.bankingsimulation.platform.service.SignUpService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class AccountOpeningController {

    @Autowired
    private SignUpService signUpService;

    /**
     * Initiate an account opening request for a user.
     */
    @PutMapping("/open-request/{userId}")
    public ResponseEntity<?> requestAccountOpening(@PathVariable String userId) {
        User user = signUpService.getAUser(userId).orElse(null);
        if (user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        if (user.getUserdetails().getAdhaar() == null || user.getUserdetails().getPan() == null)
            return ResponseEntity.badRequest().body("Please update mandatory details first");

        user.setAccountopenningreq(true);
        signUpService.save(user);
        return ResponseEntity.ok("Account opening request submitted successfully");
    }

    /**
     * Toggle account opening request status (for admin use).
     */
    @GetMapping("/toggle-request/{userId}")
    public ResponseEntity<?> toggleAccountOpeningRequest(@PathVariable String userId) {
        User user = signUpService.getAUser(userId).orElse(null);
        if (user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        user.setAccountopenningreq(!user.isAccountopenningreq());
        signUpService.save(user);

        String message = user.isAccountopenningreq()
                ? "Account opening request activated"
                : "Account opening request cancelled";

        return ResponseEntity.ok(message);
    }
}
