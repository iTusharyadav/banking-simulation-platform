package banking.simulationplatform.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import javax.persistence.*;

/**
 * Represents a user's bank account with type, balance, and creation details.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "bank_accounts")
public class BankAccount {

    @Id
    private Long accountNumber;

    @Column(nullable = false)
    private String accountType;

    @Column(nullable = false)
    private String createdDate;

    @Column(nullable = false)
    private String createdTime;

    @Column(nullable = false)
    private Double balance;

    @Column(nullable = false)
    private boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "user-accounts")
    private User user;
}
