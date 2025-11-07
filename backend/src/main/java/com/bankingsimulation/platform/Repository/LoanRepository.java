package banking.simulationplatform.repository;

import banking.simulationplatform.model.LoanAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing loan accounts.
 */
@Repository
public interface LoanRepository extends JpaRepository<LoanAccount, Long> {

    List<LoanAccount> findByUser_Id(String userId);
}
