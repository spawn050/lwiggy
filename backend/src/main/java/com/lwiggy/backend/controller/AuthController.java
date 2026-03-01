package com.lwiggy.backend.controller;

import com.lwiggy.backend.entity.User;
import com.lwiggy.backend.repository.UserRepository;
import com.lwiggy.backend.security.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository repo, BCryptPasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.get("name");
        String address = body.get("address");
        String pincode = body.get("pincode");

        if (repo.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        var user = User.builder()
                .name(name)
                .email(email)
                .passwordHash(encoder.encode(password))
                .address(address)
                .pincode(pincode)
                .build();

        repo.save(user);
        return ResponseEntity.ok(Map.of("message", "Registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
        String email = body.get("email");
        String password = body.get("password");

        return repo.findByEmail(email)
                .filter(user -> encoder.matches(password, user.getPasswordHash()))
                .map(user -> {
                    String jwt = jwtUtil.generateToken(user.getId(), user.getEmail());
                    Cookie cookie = new Cookie("AUTH_TOKEN", jwt);
                    cookie.setHttpOnly(true);
                    cookie.setSecure(false);
                    cookie.setPath("/");
                    cookie.setMaxAge(60);
                    response.addCookie(cookie);
                    return ResponseEntity.ok(Map.of("email", user.getEmail()));
                })
                .orElseGet(() -> ResponseEntity.status(401)
                        .body(Map.of("message", "Invalid credentials")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("AUTH_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "AUTH_TOKEN", required = false) String token) {
        if (token == null) return ResponseEntity.status(401).build();
        try {
            Claims claims = jwtUtil.validateToken(token);
            return ResponseEntity.ok(Map.of(
                    "email", claims.getSubject(),
                    "userId", claims.get("userId")
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}