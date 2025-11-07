package banking.simulationplatform.controllers;

import java.sql.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import banking.simulationplatform.model.Role;
import banking.simulationplatform.model.User;
import banking.simulationplatform.service.MailService;
import banking.simulationplatform.service.SignUpService;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;

/**
 * Manages user sign-up, email OTP verification and role creation.
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private MailService mailService;

    /**
     * Registers a new user and sends an OTP for verification.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        log.info("New signup request: {}", user.getEmail());

        if (signUpService.findByEmail(user.getEmail()) != null) {
            log.warn("Signup failed — email already registered: {}", user.getEmail());
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }

        String userId = UUID.randomUUID().toString();
        String otp = RandomString.make(6);

        user.setUserId(userId);
        user.setOtp(otp);
        user.setRole(Role.USER);
        user.setCreatedDate(new Date(System.currentTimeMillis()));

        User createdUser = signUpService.createUser(user);
        mailService.transactionMail(
                user.getEmail(),
                "Registration OTP Code",
                "Your 6-digit OTP code is: " + otp +
                        "\n\nClick here to verify your account: http://localhost:3000/signup/otp" +
                        "\n\nThank you for registering."
        );

        log.info("User registered successfully: {}", user.getEmail());
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    /**
     * Validates OTP entered by the user.
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody User user) {
        if (signUpService.findByOTP(user.getOtp()) == null) {
            log.warn("OTP verification failed for user");
            return new ResponseEntity<>("Invalid OTP", HttpStatus.CONFLICT);
        }

        signUpService.updateIsEmailVerified(user.getOtp());
        log.info("OTP verification successful for user");
        return new ResponseEntity<>("Email verified successfully", HttpStatus.OK);
    }

    /**
     * Resend OTP to existing registered users.
     */
    @PostMapping("/resend-otp/{userId}")
    public ResponseEntity<?> resendOtp(@PathVariable String userId) {
        User existingUser = signUpService.findById(userId);
        if (existingUser == null) {
            log.warn("Resend OTP failed — user not found: {}", userId);
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        String otp = RandomString.make(6);
        existingUser.setOtp(otp);
        signUpService.save(existingUser);

        mailService.transactionMail(
                existingUser.getEmail(),
                "Registration OTP Code",
                "Your new 6-digit OTP code is: " + otp +
                        "\n\nClick here to verify: http://localhost:3000/signup/otp" +
                        "\n\nThank you."
        );

        log.info("Resent OTP to user: {}", existingUser.getEmail());
        return new ResponseEntity<>("OTP resent successfully", HttpStatus.OK);
    }
}
