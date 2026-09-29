package skillswap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "session_requests")
public class SessionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int requestedHours;

    private int deliveredHours;

    @Column(nullable = false)
    private String status = "REQUESTED";

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private Member requester;

    @ManyToOne
    @JoinColumn(name = "skill_offer_id", nullable = false)
    private SkillOffer skillOffer;

    public SessionRequest() {
    }

    public SessionRequest(int requestedHours, Member requester, SkillOffer skillOffer) {
        this.requestedHours = requestedHours;
        this.requester = requester;
        this.skillOffer = skillOffer;
        this.deliveredHours = 0;
        this.status = "REQUESTED";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRequestedHours() {
        return requestedHours;
    }

    public void setRequestedHours(int requestedHours) {
        this.requestedHours = requestedHours;
    }

    public int getDeliveredHours() {
        return deliveredHours;
    }

    public void setDeliveredHours(int deliveredHours) {
        this.deliveredHours = deliveredHours;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Member getRequester() {
        return requester;
    }

    public void setRequester(Member requester) {
        this.requester = requester;
    }

    public SkillOffer getSkillOffer() {
        return skillOffer;
    }

    public void setSkillOffer(SkillOffer skillOffer) {
        this.skillOffer = skillOffer;
    }
}