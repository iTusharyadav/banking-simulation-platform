package banking.simulationplatform.model;

import lombok.*;

import javax.persistence.*;

/**
 * Represents a fund transfer or transaction record between accounts.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Long fromAccount;

    @Column(nullable = false)
    private Double senderBalance;

    @Column(nullable = false)
    private Long toAccount;

    @Column(nullable = false)
    private Double receiverBalance;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String time;

    @Column(length = 255)
    private String description;
}
