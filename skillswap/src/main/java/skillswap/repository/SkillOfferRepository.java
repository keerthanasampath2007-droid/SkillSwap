package skillswap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skillswap.entity.SkillOffer;

public interface SkillOfferRepository extends JpaRepository<SkillOffer, Long> {
}