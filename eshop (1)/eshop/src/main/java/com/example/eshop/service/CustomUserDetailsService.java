package com.example.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.eshop.entity.User;
import com.example.eshop.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
              throws UsernameNotFoundException {
                
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

                return org.springframework.security.core.userdetails.User
                     .withUsername(user.getEmail())
                     .password(user.getPassword())
                     .roles(user.getRole().name())
                     .build();
              }

}
