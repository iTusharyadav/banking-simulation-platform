package banking.simulationplatform.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import banking.simulationplatform.model.Beneficiaries;
import banking.simulationplatform.model.User;
import banking.simulationplatform.repository.BeneficiaryRepository;
import banking.simulationplatform.repository.UserRepository;
import banking.simulationplatform.service.BeneficiariesService;

@Service
public class BeneficiariesServiceImpl implements BeneficiariesService {

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Beneficiaries createBeneficiary(Beneficiaries beneficiary) {
        return beneficiaryRepository.save(beneficiary);
    }

    @Override
    public Beneficiaries getBeneficiaryById(int beneficiaryId) {
        return beneficiaryRepository.findById(beneficiaryId).orElse(null);
    }

    @Override
    public List<Beneficiaries> getAllBeneficiaries() {
        return beneficiaryRepository.findAll();
    }

    @Override
    public Beneficiaries updateBeneficiary(Beneficiaries beneficiary) {
        return beneficiaryRepository.save(beneficiary);
    }

    @Override
    public void deleteBeneficiary(int beneficiaryId) {
        beneficiaryRepository.deleteById(beneficiaryId);
    }

    @Override
    public List<Beneficiaries> getBeneficiariesByUserId(String userId) {
        return beneficiaryRepository.findAllByUserId(userId);
    }

    @Override
    public List<Beneficiaries> createBeneficiaries(Beneficiaries beneficiary, String userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Beneficiaries> existingBeneficiaries = beneficiaryRepository.findAllByUserId(userId);
        existingBeneficiaries.add(beneficiary);
        user.setBeneficiaries(existingBeneficiaries);
        User updatedUser = userRepository.save(user);
        return updatedUser.getBeneficiaries();
    }
}
