package com.dev.DevApp.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Remplacez par l'URL de votre frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes HTTP autorisées
                        .allowedHeaders("*") // Tous les en-têtes autorisés
                        .allowCredentials(true) // Autorise les cookies et les informations d'authentification
                        .maxAge(3600); // Durée de validité de la préparation des requêtes (en secondes)
            }
        };
    }
}
