package com.fibiyo.Market.entity;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;



// Entity annnotation bir sınıfın bir veritabanı tablosunu
//Table annotation bir java sınıfının bir veritabanı tablosu ile ilişkili olduğunu belirtir.
//Data annotation bir sınıfın get ve set metodlarını oluşturur.
@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    // Column annotation, DB'deki kolon isimleri ile birebir aynı olmak zorundadır.
    private Long id;
    

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    // sütun boş geçemez : nullable = false
    // ManyToOne annotation, bir sınıfın birden fazla sınıfın birden fazla örneğini ilişkilendirir.
    // JoinColumn annotation, bir sınıfın başka bir sınıfın bir örneğini ilişkilendirir.    

    private ProductCategory category;



    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    // CreationTimestamp annotation, sınıfın oluşturulma tarihini otomatik olarak belirler.
    //  UpdateTimestamp annotation, sınıfın güncellenme tarihini otomatik olarak belirler.
    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

 
    
}
