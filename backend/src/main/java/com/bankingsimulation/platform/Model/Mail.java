package banking.simulationplatform.model;

import lombok.*;

import java.util.Date;

/**
 * Represents an email message sent within the system.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class Mail {

    private String email;
    private String subject;
    private String body;
    private Date sentDate;
}
