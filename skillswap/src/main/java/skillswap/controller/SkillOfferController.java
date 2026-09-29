package skillswap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skillswap.entity.SkillOffer;
import skillswap.service.SkillOfferService;

import java.util.List;

@RestController
@RequestMapping("/api/skill-offers")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillOfferController {

    private final SkillOfferService skillOfferService;

    public SkillOfferController(SkillOfferService skillOfferService) {
        this.skillOfferService = skillOfferService;
    }

    @GetMapping
    public List<SkillOffer> getAllOffers() {
        return skillOfferService.getAllOffers();
    }

    @GetMapping("/{id}")
    public SkillOffer getOfferById(@PathVariable Long id) {
        return skillOfferService.getOfferById(id);
    }

    @PostMapping
    public SkillOffer createOffer(
            @RequestParam Long providerId,
            @RequestBody SkillOffer offer) {

        return skillOfferService.createOffer(providerId, offer);
    }

    @PutMapping("/{id}")
    public SkillOffer updateOffer(
            @PathVariable Long id,
            @RequestBody SkillOffer offer) {

        return skillOfferService.updateOffer(id, offer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {

        skillOfferService.deleteOffer(id);

        return ResponseEntity.noContent().build();
    }
}