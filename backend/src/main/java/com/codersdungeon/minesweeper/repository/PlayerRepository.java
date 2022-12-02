package com.codersdungeon.minesweeper.repository;

import com.codersdungeon.minesweeper.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findByUsername(String username);

    Player findByUsernameAndPassword(String username, String password);
}