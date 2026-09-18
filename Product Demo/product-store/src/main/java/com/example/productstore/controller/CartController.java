package com.example.productstore.controller;

import com.example.productstore.model.CartItem;
import com.example.productstore.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(
            CartService cartService) {

        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getCart() {

        return cartService.getCart();
    }

    @PostMapping("/{productId}")
    public CartItem addToCart(
            @PathVariable Long productId) {

        return cartService.addToCart(productId);
    }

    @DeleteMapping("/{cartItemId}")
    public void removeFromCart(
            @PathVariable Long cartItemId) {

        cartService.removeFromCart(cartItemId);
    }
}