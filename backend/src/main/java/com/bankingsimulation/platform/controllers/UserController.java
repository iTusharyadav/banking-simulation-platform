package banking.simulationplatform.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import javax.servlet.http.HttpServletResponse;

import banking.simulationplatform.exceptions.UserNotFoundException;
import banking.simulationplatform.model.Mail;
import banking.simulationplatform.model.User;
import banking.simulationplatform.model.UserDetail;
import banking.simulationplatform.requests.ChangePasswordReq;
import banking.simulationplatform.requests.ImageResponse;
import banking.simulationplatform.service.*;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Controller that handles user profile management, password operations,
 * and mail functionalities.
 */
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private SignUpService signUpService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private MailService mailService;

    @Autowired
    private FileService fileService;

    @Value("${user.profile.image.path}")
    private String imageUploadPath;

    /**
     * Fetch all registered users.
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = signUpService.GetAllUsers();
        log.info("Fetched {} users from database", users.size());
        return ResponseEntity.ok(users);
    }

    /**
     * Fetch a single user by ID.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        Optional<User> user = signUpService.getAUser(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found"));
    }

    /**
     * Create user profile.
     */
    @PutMapping("/profile/create/{userId}")
    public ResponseEntity<?> createUserProfile(@RequestBody UserDetail detail, @PathVariable String userId)
            throws UserNotFoundException {
        User user = profileService.createUserProfile(detail, userId);
        if (user == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User not updated");
        return ResponseEntity.ok(user);
    }

    /**
     * Update user profile.
     */
    @PutMapping("/profile/update/{userId}")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDetail detail, @PathVariable String userId)
            throws UserNotFoundException {
        User user = profileService.updateUserProfile(detail, userId);
        if (user == null)
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User not updated");
        return ResponseEntity.ok(user);
    }

    /**
     * Enable or disable a user account.
     */
    @PutMapping("/toggle-status/{userId}")
    public ResponseEntity<?> toggleUserStatus(@PathVariable String userId) throws UserNotFoundException {
        User user = signUpService.getAUser(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setEnabled(!user.isEnabled());
        signUpService.save(user);
        log.info("User {} status toggled to {}", user.getEmail(), user.isEnabled());
        return ResponseEntity.ok(user);
    }

    /**
     * Handle forgot password and send reset link.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody User userRequest) {
        User user = signUpService.findByEmail(userRequest.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User not found");
        }

        String token = RandomString.make(30);
        signUpService.updateResetPasswordToken(token, user.getEmail());
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        mailService.sendMail(user.getEmail(), resetLink);
        log.info("Reset password link sent to {}", user.getEmail());
        return ResponseEntity.ok("Password reset link sent");
    }

    /**
     * Reset password using token.
     */
    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody User userReq) {
        User user = signUpService.findByResetPasswordToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid token");
        }
        signUpService.updatePassword(userReq.getPassword(), token);
        log.info("Password reset for {}", user.getEmail());
        return ResponseEntity.ok("Password updated successfully");
    }

    /**
     * Change password (after login).
     */
    @PostMapping("/change-password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable String userId,
                                            @RequestBody ChangePasswordReq changePasswordReq) {
        boolean updated = signUpService.changePassword(userId, changePasswordReq);
        if (!updated)
            return ResponseEntity.badRequest().body("Invalid current password");
        return ResponseEntity.ok("Password changed successfully");
    }

    /**
     * Send custom mail.
     */
    @PostMapping("/mail")
    public ResponseEntity<?> sendMail(@RequestBody Mail mail) {
        mail.setSentDate(new Date(System.currentTimeMillis()));
        mailService.send(mail);
        return ResponseEntity.ok("Mail sent successfully");
    }

    /**
     * Upload user profile image.
     */
    @PostMapping("/image/{userId}")
    public ResponseEntity<ImageResponse> uploadImage(@RequestParam("image") MultipartFile image,
                                                     @PathVariable String userId) throws IOException {
        String imageName = fileService.uploadFile(image, imageUploadPath);
        User user = signUpService.findById(userId);
        user.setImageName(imageName);
        signUpService.save(user);
        ImageResponse response = ImageResponse.builder()
                .imageName(imageName)
                .message("Image uploaded successfully")
                .success(true)
                .status(HttpStatus.CREATED)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Serve user profile image.
     */
    @GetMapping("/image/{userId}")
    public void serveUserImage(@PathVariable String userId, HttpServletResponse response) throws IOException {
        User user = signUpService.findById(userId);
        InputStream resource = fileService.getResource(imageUploadPath, user.getImageName());
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }
}
