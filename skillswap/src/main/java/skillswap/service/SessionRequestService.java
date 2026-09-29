package skillswap.service;

import org.springframework.stereotype.Service;
import skillswap.entity.Member;
import skillswap.entity.SessionRequest;
import skillswap.entity.SkillOffer;
import skillswap.repository.MemberRepository;
import skillswap.repository.SessionRequestRepository;
import skillswap.repository.SkillOfferRepository;

import java.util.List;

@Service
public class SessionRequestService {

    private final SessionRequestRepository sessionRequestRepository;
    private final MemberRepository memberRepository;
    private final SkillOfferRepository skillOfferRepository;

    public SessionRequestService(
            SessionRequestRepository sessionRequestRepository,
            MemberRepository memberRepository,
            SkillOfferRepository skillOfferRepository) {

        this.sessionRequestRepository = sessionRequestRepository;
        this.memberRepository = memberRepository;
        this.skillOfferRepository = skillOfferRepository;
    }

    public List<SessionRequest> getAllRequests() {
        return sessionRequestRepository.findAll();
    }

    public SessionRequest getRequestById(Long id) {
        return sessionRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session request not found"));
    }

    public SessionRequest createRequest(
            Long requesterId,
            Long skillOfferId,
            int requestedHours) {

        Member requester = memberRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        SkillOffer skillOffer = skillOfferRepository.findById(skillOfferId)
                .orElseThrow(() -> new RuntimeException("Skill offer not found"));

        if (requestedHours <= 0) {
            throw new RuntimeException("Requested hours must be greater than zero");
        }

        if (requestedHours > skillOffer.getAvailableHours()) {
            throw new RuntimeException("Not enough available hours");
        }

        SessionRequest request =
                new SessionRequest(requestedHours, requester, skillOffer);

        return sessionRequestRepository.save(request);
    }

    public SessionRequest updateStatus(Long id, String status) {

        SessionRequest request = getRequestById(id);

        request.setStatus(status);

        return sessionRequestRepository.save(request);
    }

    public SessionRequest updateDeliveredHours(Long id, int deliveredHours) {

        SessionRequest request = getRequestById(id);

        if (deliveredHours < 0) {
            throw new RuntimeException("Delivered hours cannot be negative");
        }

        if (deliveredHours > request.getRequestedHours()) {
            throw new RuntimeException(
                    "Delivered hours cannot exceed requested hours");
        }

        request.setDeliveredHours(deliveredHours);

        return sessionRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {

        SessionRequest request = getRequestById(id);

        sessionRequestRepository.delete(request);
    }
}