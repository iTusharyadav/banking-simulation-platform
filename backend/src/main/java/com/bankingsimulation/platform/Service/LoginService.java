package banking.simulationplatform.service;

import banking.simulationplatform.exception.UserNotFoundException;
import banking.simulationplatform.model.User;
import banking.simulationplatform.requests.LoginRequest;

/**
 * Business interface for user authentication and login operations.
 */
public interface LoginService {

    User findByEmail(LoginRequest loginRequest) throws UserNotFoundException;
}
