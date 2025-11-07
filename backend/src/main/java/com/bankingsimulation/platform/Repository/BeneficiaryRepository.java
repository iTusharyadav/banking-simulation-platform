package banking.simulationplatform.repository;

import banking.simulationplatform.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing beneficiary entities linked to users.
 */
@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Integer> {

    @Query(value = "SELECT * FROM beneficiaries WHERE user_userid = ?1", nativeQuery = true)
    List<Beneficiary> findAllByUserId(String userId);
}
