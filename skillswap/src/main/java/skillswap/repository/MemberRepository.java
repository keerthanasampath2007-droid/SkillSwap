package skillswap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skillswap.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}