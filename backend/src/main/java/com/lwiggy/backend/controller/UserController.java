package com.lwiggy.backend.controller;

import com.lwiggy.backend.dto.UserDTO;
import com.lwiggy.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(userService.getMe(userId));
    }
}
