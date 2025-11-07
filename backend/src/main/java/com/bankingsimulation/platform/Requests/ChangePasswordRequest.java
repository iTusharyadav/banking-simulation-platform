package banking.simulationplatform.dto;

import lombok.*;

/**
 * DTO for handling password change requests.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}
