package com.fibiyo.Market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fibiyo.Market.entity.Product;

public interface ProductRepository extends JpaRepository< Product, Long> {

}
