package com.example.eshop.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eshop.entity.Order;
import com.example.eshop.entity.User;
import com.example.eshop.repository.UserRepository;
import com.example.eshop.service.OrderService;

@RestController
@RequestMapping("/user/orders")
public class CustomerOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public Map<String, Object> getOrders(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Order> orders = orderService.getOrdersByUser(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        response.put("count", orders.size());
        
        return response;
    }

    @GetMapping("/{orderId}")
    public Order getOrderDetails(@PathVariable Long orderId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = orderService.getOrderById(orderId);
        if (order == null || !order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Order not found or unauthorized");
        }
        
        return order;
    }
}