package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.game.*;
import com.codersdungeon.minesweeper.service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class GameController {

    @Autowired
    public GameService gameService;

    @PostMapping("/game")
    public GameResponseDTO newGame(@RequestBody GameRequestDTO request) {
        return gameService.createGame(request);
    }

    @GetMapping("/game")
    public GameListDTO findByAll() {
        return gameService.findByAll();
    }

    @DeleteMapping("/game/{gameId}")
    public void deleteGame(@PathVariable("gameId") Long gameId) {
        gameService.deleteGame(gameId);
    }

    @PutMapping("/game/{gameId}/pause")
    public void pauseGame(@PathVariable("gameId") Long gameId) {
        gameService.pauseGame(gameId);
    }

    @GetMapping("/game/{gameId}")
    public LoadGameResponseDTO loadGame(@PathVariable("gameId") Long gameId) {
        return gameService.loadGame(gameId);
    }

    @PutMapping("/game/{gameId}")
    public StartGameResponseDTO startGame(@PathVariable("gameId") Long gameId){
        return gameService.startGame(gameId);
    }



}
