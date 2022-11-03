package com.codersdungeon.minesweeper.config;

//import com.codersdungeon.minesweeper.entity.Player;
//import com.codersdungeon.minesweeper.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@Profile("dev")
public class DevConfig {
    private static final Logger LOG = LoggerFactory.getLogger(DevConfig.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private PlayerRepository playerRepository;

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

//    @PostConstruct
//    public void createTestUsers() {
//        if(playerRepository.findByUsername("user").isPresent()){
//            return;
//        }
//
//        Player player = new Player();
//        player.setUsername("user");
//        player.setPassword(passwordEncoder.encode("password"));
//
//        playerRepository.save(player);
//    }
}