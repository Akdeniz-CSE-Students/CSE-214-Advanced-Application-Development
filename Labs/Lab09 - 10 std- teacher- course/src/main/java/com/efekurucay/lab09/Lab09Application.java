package com.efekurucay.lab09;

import com.efekurucay.lab09.controller.TestDataController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Lab09Application {

	@Autowired
	private TestDataController testDataController;

	public static void main(String[] args) {
		SpringApplication.run(Lab09Application.class, args);
	}

	@Bean
	public CommandLineRunner initDataLoader() {
		return args -> {
			try {
				System.out.println("Uygulama başlatıldı, test verileri kontrol ediliyor...");
				// Veri durumunu kontrol et
				testDataController.checkStatus();
				// Uygulamayı durdurmadan test verilerini yüklemeyi dene
				testDataController.addTestData();
				System.out.println("Test verileri işlemi tamamlandı!");
			} catch (Exception e) {
				// Hata oluşursa sadece logla, uygulamanın başlamasını engelleme
				System.err.println("Test verileri yüklenirken hata oluştu: " + e.getMessage());
				e.printStackTrace();
				System.out.println("Uygulama hataya rağmen başlatılıyor...");
			}
		};
	}
}
