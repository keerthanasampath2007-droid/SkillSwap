package skillswap.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_offers")
public class SkillOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String skillName;

    @Column(nullable = false)
    private int availableHours;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private Member provider;

    public SkillOffer() {
    }

    public SkillOffer(String skillName, int availableHours, Member provider) {
        this.skillName = skillName;
        this.availableHours = availableHours;
        this.provider = provider;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public int getAvailableHours() {
        return availableHours;
    }

    public void setAvailableHours(int availableHours) {
        this.availableHours = availableHours;
    }

    public Member getProvider() {
        return provider;
    }

    public void setProvider(Member provider) {
        this.provider = provider;
    }
}