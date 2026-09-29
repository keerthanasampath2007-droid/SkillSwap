package skillswap.service;

import org.springframework.stereotype.Service;
import skillswap.entity.Member;
import skillswap.repository.MemberRepository;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Long id, Member member) {
        Member existing = getMemberById(id);

        existing.setName(member.getName());
        existing.setEmail(member.getEmail());
        existing.setCreditBalance(member.getCreditBalance());

        return memberRepository.save(existing);
    }

    public void deleteMember(Long id) {
        Member existing = getMemberById(id);
        memberRepository.delete(existing);
    }
}