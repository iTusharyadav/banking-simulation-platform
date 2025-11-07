package banking.simulationplatform.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

/**
 * Response model for image upload or retrieval operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageResponse {
    private String imageName;
    private String message;
    private boolean success;
    private HttpStatus status;
}
