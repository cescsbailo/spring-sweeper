package com.codersdungeon.minesweeper.config;

//import com.codersdungeon.minesweeper.entity.Player;
//import com.codersdungeon.minesweeper.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class UserConfig {
    private static final Logger LOG = LoggerFactory.getLogger(WebSecurity.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private PlayerRepository playerRepository;
//
//    @PostConstruct
//    @Profile("dev")
//    public void createTestUsers() {
//        LOG.debug("dev config");
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
