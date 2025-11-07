package banking.simulationplatform.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import banking.simulationplatform.exceptions.BadApiRequestException;
import banking.simulationplatform.model.User;
import banking.simulationplatform.requests.LoginRequest;
import banking.simulationplatform.requests.LoginResponse;
import banking.simulationplatform.service.LoginService;
import banking.simulationplatform.utility.JwtUtil;
import lombok.extern.slf4j.Slf4j;

/**
 * Handles user login and JWT token generation.
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Authenticates user and returns JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        log.info("Login attempt for user: {}", request.getEmail());

        authenticate(request.getEmail(), request.getPassword());
        User user = (User) userDetailsService.loadUserByUsername(request.getEmail());

        String token = jwtUtil.generateToken(user);

        // Hide password for security
        user.setPassword(null);

        LoginResponse response = LoginResponse.builder()
                .jwtToken(token)
                .user(user)
                .build();

        log.info("Login successful for {}", user.getEmail());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Internal helper method to authenticate credentials.
     */
    private void authenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(email, password);

        try {
            authManager.authenticate(authToken);
        } catch (BadCredentialsException e) {
            log.error("Invalid login attempt for {}", email);
            throw new BadApiRequestException("Invalid username or password");
        } catch (Exception e) {
            log.error("Unexpected authentication error: {}", e.getMessage());
            throw new BadApiRequestException("Authentication failed");
        }
    }
}
