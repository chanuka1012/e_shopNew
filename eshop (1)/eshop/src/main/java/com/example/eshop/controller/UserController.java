package com.example.eshop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.entity.User;
import com.example.eshop.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to User Dashboard");
        response.put("user", userDetails.getUsername());
        response.put("role", "USER");
        return response;
    }

    @GetMapping("/info")
    public Map<String, Object> getUserInfo(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name());
        
        return response;
    }

    @GetMapping("/profile")
    public Map<String, Object> getProfile(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().name());
        response.put("memberSince", user.getCreatedAt());
        
        return response;
    }

    @GetMapping("/stats")
    public Map<String, Object> getUserStats(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", 0);
        stats.put("totalSpent", 0.0);
        stats.put("wishlistCount", 0);
        stats.put("cartItems", 0);
        
        return stats;
    }
}