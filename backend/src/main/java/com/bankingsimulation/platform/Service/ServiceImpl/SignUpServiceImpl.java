package banking.simulationplatform.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.User;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.requests.ChangePasswordReq;
import banking.simulationplatform.service.SignUpService;

@Service
public class SignUpServiceImpl implements SignUpService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getAUser(String userId) {
        return userRepository.findById(userId);
    }

    @Override
    public List<User> GetAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public User findByResetPasswordToken(String token) {
        return userRepository.findByResetPasswordToken(token);
    }

    @Override
    public void updateResetPasswordToken(String token, String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setResetPasswordToken(token);
            userRepository.save(user);
        }
    }

    @Override
    public void updatePassword(String password, String token) {
        User user = userRepository.findByResetPasswordToken(token);
        user.setPassword(passwordEncoder.encode(password));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    @Override
    public User findByOTP(String otp) {
        return userRepository.findByOtp(otp);
    }

    @Override
    public void deleteAccount(String email) {
        userRepository.deleteUser(email);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void updateIsEmailVerified(String otp) {
        User user = userRepository.findByOtp(otp);
        user.setEmailVerified(true);
        user.setOtp(null);
        userRepository.save(user);
    }

    @Override
    public Boolean changePassword(String userId, ChangePasswordReq req) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null && passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(req.getNewPassWord()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public User findById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
