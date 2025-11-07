package banking.simulationplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banking.simulationplatform.exceptions.UserNotFoundException;
import banking.simulationplatform.model.User;
import banking.simulationplatform.model.UserDetail;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {
        if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {
            throw new UserNotFoundException("Provide all mandatory fields (Aadhaar, PAN, Mobile)");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        userDetails.setUser(user);
        user.setUserdetails(userDetails);
        return userRepository.save(user);
    }

    @Override
    public User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException {
        if (userDetails.getAdhaar() == null || userDetails.getPan() == null || userDetails.getMobile() == null) {
            throw new UserNotFoundException("Provide all mandatory fields (Aadhaar, PAN, Mobile)");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        userDetails.setUser(user);
        user.setUserdetails(userDetails);
        return userRepository.save(user);
    }
}
