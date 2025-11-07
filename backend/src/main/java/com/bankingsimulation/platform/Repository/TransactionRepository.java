package banking.simulationplatform.repository;

import banking.simulationplatform.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for managing all transaction records between accounts.
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query(value = "SELECT * FROM transactions WHERE from_account = ?1", nativeQuery = true)
    List<Transaction> findBySenderAccount(long accountNo);

    @Query(value = "SELECT * FROM transactions WHERE from_account = ?1 ORDER BY transaction_date DESC, transaction_time DESC LIMIT 1", nativeQuery = true)
    Transaction findLatestBySender(long fromAccount);

    @Query(value = "SELECT * FROM transactions WHERE from_account = ?1 ORDER BY transaction_date DESC, transaction_time DESC", nativeQuery = true)
    List<Transaction> findAllBySender(long accountNo);

    @Query(value = "SELECT * FROM transactions WHERE to_account = ?1 ORDER BY transaction_date DESC, transaction_time DESC", nativeQuery = true)
    List<Transaction> findAllByReceiver(long toAccount);

    @Query(value = "SELECT * FROM transactions WHERE from_account = ?1 OR to_account = ?1 ORDER BY transaction_date DESC, transaction_time DESC", nativeQuery = true)
    List<Transaction> findAllByAccount(long accountNo);
}
