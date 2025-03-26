package com.fibiyo.Market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.fibiyo.Market.entity.ProductCategory;


@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")


public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
