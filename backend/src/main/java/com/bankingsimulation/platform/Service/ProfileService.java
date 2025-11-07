package banking.simulationplatform.service;

import banking.simulationplatform.exception.UserNotFoundException;
import banking.simulationplatform.model.User;
import banking.simulationplatform.model.UserDetail;

public interface ProfileService {
    User createUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;
    User updateUserProfile(UserDetail userDetails, String userId) throws UserNotFoundException;
}
