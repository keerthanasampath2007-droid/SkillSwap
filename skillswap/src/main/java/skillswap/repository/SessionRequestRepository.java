package skillswap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skillswap.entity.SessionRequest;

public interface SessionRequestRepository extends JpaRepository<SessionRequest, Long> {
}