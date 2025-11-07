package banking.simulationplatform.repository;

import banking.simulationplatform.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for accessing and managing user profile details.
 */
@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetail, Integer> {
    // Additional queries can be added later for profile-based lookups
}
