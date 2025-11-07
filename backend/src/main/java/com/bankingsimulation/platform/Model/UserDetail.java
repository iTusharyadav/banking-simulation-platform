package banking.simulationplatform.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Blob;
import java.sql.Date;

/**
 * Stores extended user profile information.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_details")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Blob image;
    private String address;
    private String city;
    private String pinCode;
    private String state;
    private String aadhaar;
    private String mobile;
    private String pan;
    private char gender;

    @Column(name = "birth_date")
    private Date dateOfBirth;

    private Integer age;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User user;
}
