package banking.simulationplatform.dto;

import banking.simulationplatform.model.User;
import lombok.*;

/**
 * Response returned after successful authentication, containing JWT and user details.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginResponse {
    private String jwtToken;
    private User user;
}
