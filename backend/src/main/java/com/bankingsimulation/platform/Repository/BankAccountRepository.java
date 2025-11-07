package banking.simulationplatform.repository;

import banking.simulationplatform.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing bank account entities.
 */
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    @Query(value = "SELECT * FROM bankaccount WHERE accountno = ?1", nativeQuery = true)
    BankAccount findByAccountNo(long accountNo);

    @Query(value = "SELECT * FROM bankaccount WHERE user_userid = ?1", nativeQuery = true)
    List<BankAccount> findAllByUserId(String userId);
}
