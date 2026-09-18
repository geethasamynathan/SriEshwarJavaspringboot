package com.example.productstore;

import com.example.productstore.model.Product;
import com.example.productstore.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductStoreApplication.class, args);

    }

    @Bean
    CommandLineRunner loadProducts(
            ProductRepository productRepository) {

        return args -> {

            if (productRepository.count() == 0) {

                productRepository.save(
                        new Product(
                                "Gaming Laptop",
                                "Electronics",
                                65000.0,
                                5,
                                "/images/laptop.jpg"
                        )
                );

                productRepository.save(
                        new Product(
                                "Smart Phone",
                                "Electronics",
                                25000.0,
                                0,
                                "/images/phone.jpg"
                        )
                );

                productRepository.save(
                        new Product(
                                "Cotton T-Shirt",
                                "Fashion",
                                799.0,
                                15,
                                "/images/tshirt.jpg"
                        )
                );

                productRepository.save(
                        new Product(
                                "Running Shoes",
                                "Fashion",
                                2499.0,
                                8,
                                "/images/shoes.jpg"
                        )
                );
            }
        };
    }
}
