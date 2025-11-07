package banking.simulationplatform.service;

import java.util.List;
import java.util.Optional;

import banking.simulationplatform.model.User;
import banking.simulationplatform.requests.ChangePasswordReq;

public interface SignUpService {

    User createUser(User user);

    Optional<User> getAUser(String userId);

    List<User> getAllUsers();

    boolean checkEmail(String email);

    User findByResetPasswordToken(String token);

    void updateResetPasswordToken(String token, String email);

    void updatePassword(String password, String token);

    Boolean changePassword(String userId, ChangePasswordReq changePasswordReq);

    User findByOTP(String otp);

    User findById(String userId);

    void updateIsEmailVerified(String otp);

    void deleteAccount(String email);

    User findByEmail(String email);

    void save(User theUser);
}
