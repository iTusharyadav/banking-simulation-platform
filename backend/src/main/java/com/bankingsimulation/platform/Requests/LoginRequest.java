package banking.simulationplatform.dto;

import lombok.*;

/**
 * DTO used for user login authentication requests.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginRequest {
    private String email;
    private String password;
}
