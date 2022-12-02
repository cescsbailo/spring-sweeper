package com.codersdungeon.minesweeper.service.player;

import com.codersdungeon.minesweeper.dto.player.PlayerDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerListDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerRequestDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerResponseDTO;

public interface PlayerService {
    PlayerDTO findById(Long id);
    PlayerListDTO findByAll();
    PlayerDTO findByUsername(String username);
    PlayerDTO findByUsernameAndPassword(PlayerRequestDTO request);
    PlayerResponseDTO createPlayer (PlayerRequestDTO request);
    PlayerResponseDTO updatePlayer(Long id, PlayerRequestDTO request);
    void deletePlayer(Long id);
}
