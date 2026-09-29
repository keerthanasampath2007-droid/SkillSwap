package skillswap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skillswap.entity.SessionRequest;
import skillswap.service.SessionRequestService;

import java.util.List;

@RestController
@RequestMapping("/api/session-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class SessionRequestController {

    private final SessionRequestService sessionRequestService;

    public SessionRequestController(
            SessionRequestService sessionRequestService) {
        this.sessionRequestService = sessionRequestService;
    }

    @GetMapping
    public List<SessionRequest> getAllRequests() {
        return sessionRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public SessionRequest getRequestById(@PathVariable Long id) {
        return sessionRequestService.getRequestById(id);
    }

    @PostMapping
    public SessionRequest createRequest(
            @RequestParam Long requesterId,
            @RequestParam Long skillOfferId,
            @RequestParam int requestedHours) {

        return sessionRequestService.createRequest(
                requesterId,
                skillOfferId,
                requestedHours
        );
    }

    @PutMapping("/{id}/status")
    public SessionRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return sessionRequestService.updateStatus(id, status);
    }

    @PutMapping("/{id}/delivered-hours")
    public SessionRequest updateDeliveredHours(
            @PathVariable Long id,
            @RequestParam int deliveredHours) {

        return sessionRequestService.updateDeliveredHours(
                id,
                deliveredHours
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {

        sessionRequestService.deleteRequest(id);

        return ResponseEntity.noContent().build();
    }
}