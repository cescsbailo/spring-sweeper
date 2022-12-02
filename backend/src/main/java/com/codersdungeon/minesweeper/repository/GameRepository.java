package com.codersdungeon.minesweeper.repository;

import com.codersdungeon.minesweeper.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByWon(boolean won);

    //List<Game> findByPlayerId(Long playerId);
}