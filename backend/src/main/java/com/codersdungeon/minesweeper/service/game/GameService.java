package com.codersdungeon.minesweeper.service.game;

import com.codersdungeon.minesweeper.dto.game.*;

public interface GameService {

    LoadGameResponseDTO loadGame(Long id);
    GameListDTO findByAll();
    GameResponseDTO createGame(GameRequestDTO game);
    void deleteGame(Long id);
    void pauseGame(Long gameId);
    StartGameResponseDTO startGame(Long id);


}
