package com.example.productstore.service;

import com.example.productstore.model.CartItem;
import com.example.productstore.model.Product;
import com.example.productstore.repository.CartItemRepository;
import com.example.productstore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(
            CartItemRepository cartItemRepository,
            ProductRepository productRepository) {

        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public List<CartItem> getCart() {

        return cartItemRepository.findAll();
    }

    public CartItem addToCart(Long productId) {

        Product product = productRepository
                .findById(productId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Product not found"));

        if (product.getStockQuantity() <= 0) {

            throw new RuntimeException(
                    "Product is out of stock");
        }

        CartItem cartItem =
                cartItemRepository
                        .findByProductId(productId)
                        .orElse(null);

        if (cartItem == null) {

            cartItem =
                    new CartItem(product, 1);

        } else {

            if (cartItem.getQuantity()
                    >= product.getStockQuantity()) {

                throw new RuntimeException(
                        "No more stock available");
            }

            cartItem.setQuantity(
                    cartItem.getQuantity() + 1);
        }

        return cartItemRepository.save(cartItem);
    }

    public void removeFromCart(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);
    }
}