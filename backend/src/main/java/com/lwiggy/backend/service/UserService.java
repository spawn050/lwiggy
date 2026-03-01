package com.lwiggy.backend.service;

import com.lwiggy.backend.dto.UserDTO;
import com.lwiggy.backend.exception.ResourceNotFoundException;
import com.lwiggy.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDTO getMe(Long userId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .address(user.getAddress())
                .pincode(user.getPincode())
                .build();
    }
}
