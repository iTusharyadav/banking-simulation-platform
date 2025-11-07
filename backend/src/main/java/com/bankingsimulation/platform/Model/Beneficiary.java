package banking.simulationplatform.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import javax.persistence.*;

/**
 * Represents a user's registered beneficiary for fund transfers.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "beneficiaries")
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long accountNumber;

    @Column(nullable = false)
    private String relation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "user-beneficiaries")
    private User user;
}
