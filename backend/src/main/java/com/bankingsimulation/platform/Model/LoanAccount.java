package banking.simulationplatform.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import javax.persistence.*;

/**
 * Represents a loan account associated with a user and linked bank account.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "loan_accounts")
public class LoanAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanAccountNumber;

    @Column(nullable = false)
    private Double remainingAmount;

    @Column(nullable = false)
    private Double loanAmount;

    @Column(nullable = false)
    private String purpose;

    @Column(nullable = false)
    private Double interestRate;

    @Column(nullable = false)
    private Integer tenureMonths;

    @Column(nullable = false)
    private Integer monthlyEmi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "user-loans")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private BankAccount bankAccount;
}
