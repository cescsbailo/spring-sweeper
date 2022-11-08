package com.codersdungeon.minesweeper.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@Profile("dev")
public class DevConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration apiConfiguration = new CorsConfiguration();
        apiConfiguration.setAllowedOriginPatterns(Collections.singletonList("http://localhost:3000"));
        apiConfiguration.setAllowedMethods(Arrays.asList(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()));
        apiConfiguration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
        apiConfiguration.setAllowCredentials(true);

        CorsConfiguration loginConfiguration = new CorsConfiguration();
        loginConfiguration.setAllowedOriginPatterns(Collections.singletonList("http://localhost:3000"));
        loginConfiguration.setAllowedMethods(Collections.singletonList(HttpMethod.POST.name()));
        loginConfiguration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept"));
        loginConfiguration.setAllowCredentials(false);

        CorsConfiguration logoutConfiguration = new CorsConfiguration();
        logoutConfiguration.setAllowedOriginPatterns(Collections.singletonList("http://localhost:3000"));
        logoutConfiguration.setAllowedMethods(Collections.singletonList(HttpMethod.POST.name()));
        logoutConfiguration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept"));
        logoutConfiguration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/login", loginConfiguration);
        source.registerCorsConfiguration("/logout", logoutConfiguration);
        source.registerCorsConfiguration("/api/**", apiConfiguration);
        return source;
    }
}