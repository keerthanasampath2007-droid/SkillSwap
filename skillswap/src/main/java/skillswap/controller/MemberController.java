package skillswap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skillswap.entity.Member;
import skillswap.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberService.createMember(member);
    }

    @PutMapping("/{id}")
    public Member updateMember(
            @PathVariable Long id,
            @RequestBody Member member) {

        return memberService.updateMember(id, member);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {

        memberService.deleteMember(id);

        return ResponseEntity.noContent().build();
    }
}