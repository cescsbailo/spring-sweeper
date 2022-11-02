package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.*;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1/game")
public class GameController {

    @PostMapping
    public CreateGameResponseDTO create(@RequestBody CreateGameRequestDTO request){
        CreateGameResponseDTO response = new CreateGameResponseDTO();
        response.gameId = 4L;
        return response;
    }

    @GetMapping
    public GameListResponseDTO gameList(){
        GameListResponseDTO response = new GameListResponseDTO();
        GameDTO game = new GameDTO();
        game.gameId = 4L;
        game.boardId = 4L;
        game.rows = 9;
        game.columns = 9;
        game.mines = 10;
        game.player = "big user";
        game.startDate = Instant.now().minus(1, ChronoUnit.MINUTES);
        game.endDate = Instant.now();
        game.duration = ChronoUnit.MINUTES.getDuration().toMillis();
        game.won = false;
        game.lost = true;
        response.games = Collections.singletonList(game);
        return response;
    }

    @GetMapping("/{gameId}")
    public LoadGameResponseDTO loadGame(@PathVariable(name="gameId") long gameId){
        LoadGameResponseDTO response = new LoadGameResponseDTO();
        response.gameId = 4L;
        response.boardId = 4L;
        response.rows = 9;
        response.columns = 9;
        response.totalCells = 81;
        response.totalMines = 10;
        response.discoveredCells = 23;
        response.flaggedMines = 2;
        response.player = "big user";
        response.startDate = Instant.now().minus(1, ChronoUnit.MINUTES);
        response.endDate = Instant.now();
        response.duration = ChronoUnit.MINUTES.getDuration().toMillis();
        response.won = false;
        response.lost = true;

        CellDTO cell = new CellDTO();
        cell.row = 0;
        cell.columns = 0;
        cell.nearBombs = 0;
        cell.flagged = false;
        cell.marked = false;
        cell.visited = true;
        cell.bomb = false;

        response.cells = Collections.singletonList(cell);
        return response;
    }

    @PutMapping("/{gameId}")
    public StartGameResponseDTO startGame(@PathVariable(name = "gameId") long gameId){
        StartGameResponseDTO response = new StartGameResponseDTO();
        response.startDate = Instant.now();
        return response;
    }

}
