package banking.simulationplatform.service;

import banking.simulationplatform.model.Beneficiary;
import java.util.List;

/**
 * Business interface for managing user beneficiaries.
 */
public interface BeneficiaryService {

    Beneficiary createBeneficiary(Beneficiary beneficiary);

    Beneficiary getBeneficiaryById(int beneficiaryId);

    List<Beneficiary> getAllBeneficiaries();

    Beneficiary updateBeneficiary(Beneficiary beneficiary);

    void deleteBeneficiary(int beneficiaryId);

    List<Beneficiary> getBeneficiariesByUserId(String userId);

    List<Beneficiary> createBeneficiaries(Beneficiary beneficiary, String userId);
}
