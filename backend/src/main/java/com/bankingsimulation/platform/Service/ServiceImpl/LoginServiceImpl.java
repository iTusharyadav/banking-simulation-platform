package banking.simulationplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import banking.simulationplatform.exceptions.UserNotFoundException;
import banking.simulationplatform.model.User;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.requests.LoginRequest;
import banking.simulationplatform.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(LoginRequest loginReq) throws UserNotFoundException {
        User user = userRepository.findByEmail(loginReq.getEmail());

        if (user == null)
            throw new UserNotFoundException("User not found with provided email.");

        if (!user.isEnabled())
            throw new UserNotFoundException("Email not verified.");

        if (!passwordEncoder.matches(loginReq.getPassword(), user.getPassword()))
            throw new UserNotFoundException("Invalid credentials.");

        return user;
    }
}
