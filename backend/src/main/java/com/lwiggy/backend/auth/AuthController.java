package com.lwiggy.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserRepository repo;
    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        User saved = repo.save(user);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "email", saved.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body){
        var email = body.get("email");
        var password = body.get("password");
        var opt = repo.findByEmail(email);
        if(opt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        }
        User u = opt.get();
        if(!u.getPassword().equals(password)) {
            return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        }
        return ResponseEntity.ok(Map.of("token","dummy-token","email",u.getEmail()));
    }
}
