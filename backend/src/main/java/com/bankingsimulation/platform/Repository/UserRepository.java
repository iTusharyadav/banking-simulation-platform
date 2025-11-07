package banking.simulationplatform.repository;

import banking.simulationplatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Repository for managing users, including authentication, password reset, and admin access.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByResetPasswordToken(String token);

    Optional<User> findByOtp(String otp);

    @Query(value = "SELECT * FROM userdata WHERE userid = '079b8412-6517-484b-bb85-13f782aacc22'", nativeQuery = true)
    Optional<User> findDefaultAdmin();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM userdata WHERE email = :email", nativeQuery = true)
    void deleteByEmail(String email);
}
