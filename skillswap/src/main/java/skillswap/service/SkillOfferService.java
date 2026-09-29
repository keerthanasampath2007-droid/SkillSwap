package skillswap.service;

import org.springframework.stereotype.Service;
import skillswap.entity.Member;
import skillswap.entity.SkillOffer;
import skillswap.repository.MemberRepository;
import skillswap.repository.SkillOfferRepository;

import java.util.List;

@Service
public class SkillOfferService {

    private final SkillOfferRepository skillOfferRepository;
    private final MemberRepository memberRepository;

    public SkillOfferService(
            SkillOfferRepository skillOfferRepository,
            MemberRepository memberRepository) {

        this.skillOfferRepository = skillOfferRepository;
        this.memberRepository = memberRepository;
    }

    public List<SkillOffer> getAllOffers() {
        return skillOfferRepository.findAll();
    }

    public SkillOffer getOfferById(Long id) {
        return skillOfferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill offer not found"));
    }

    public SkillOffer createOffer(Long providerId, SkillOffer offer) {

        Member provider = memberRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        offer.setProvider(provider);

        return skillOfferRepository.save(offer);
    }

    public SkillOffer updateOffer(Long id, SkillOffer offer) {

        SkillOffer existing = getOfferById(id);

        existing.setSkillName(offer.getSkillName());
        existing.setAvailableHours(offer.getAvailableHours());

        return skillOfferRepository.save(existing);
    }

    public void deleteOffer(Long id) {

        SkillOffer existing = getOfferById(id);

        skillOfferRepository.delete(existing);
    }
}