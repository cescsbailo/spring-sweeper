package com.codersdungeon.minesweeper.service.player;

import com.codersdungeon.minesweeper.dto.player.PlayerDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerListDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerRequestDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerResponseDTO;
import com.codersdungeon.minesweeper.entity.Player;
import com.codersdungeon.minesweeper.exception.PlayerNotFoundException;
import com.codersdungeon.minesweeper.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class DefaultPlayerService implements PlayerService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultPlayerService.class);

    @Autowired
    PlayerRepository playerRepository;

    public PlayerDTO findById(@PathVariable("id") Long id) {
        LOG.info("find by id {}", id);
        return playerRepository.findById(id).map(this::entityToDto).orElseThrow(PlayerNotFoundException::new);
    }

    public PlayerListDTO findByAll() {
        LOG.info("find all");
        List<PlayerDTO> giocatori = playerRepository.findAll().stream().map(this::entityToDto).collect(Collectors.toList());
        PlayerListDTO result = new PlayerListDTO();
        result.players = giocatori;
        return result;
    }

    @Override
    public PlayerDTO findByUsername(String username) {
        LOG.info("find by username {} ", username);
        try {
            Player player = playerRepository.findByUsername(username);
            return entityToDto(player);
        } catch (Exception e) {
            LOG.error("No players with this username");
            throw new PlayerNotFoundException();
        }
    }

    @Override
    public PlayerDTO findByUsernameAndPassword(@RequestBody PlayerRequestDTO request) {
        LOG.info("find by user an psw {} {}", request.username, request.password);
        try {
            Player player = playerRepository.findByUsernameAndPassword(request.username, request.password);
            return entityToDto(player);
        } catch (Exception e) {
            LOG.error("Not found");
            throw new PlayerNotFoundException();
        }
    }

    public PlayerResponseDTO createPlayer(@RequestBody PlayerRequestDTO request) {
        LOG.info("Create {}", request);
        Player entity = new Player();
        entity.setPassword(request.password);
        entity.setUsername(request.username);
               try {
            entity = playerRepository.save(entity);
        } catch (Exception e) {
            LOG.error("Duplicate key");
            throw new DuplicateKeyException("ERROR!!");
        }

      PlayerResponseDTO response = new PlayerResponseDTO();
        response.id = entity.getId();
        response.username = entity.getUsername();

        return response;
    }

    public PlayerResponseDTO updatePlayer(Long id, PlayerRequestDTO request) {
        LOG.info("Update {} {}", id, request);
        Player entity = new Player();
        entity.setId(id);
        entity.setPassword(request.password);
        entity.setUsername(request.username);

        try {
            entity = playerRepository.save(entity);
        } catch (Exception e) {
            LOG.error("Player not found");
            throw new PlayerNotFoundException();
        }
      PlayerResponseDTO response = new PlayerResponseDTO();
        response.id = entity.getId();
        response.username = entity.getUsername();

        return response;
    }

    public void deletePlayer(@PathVariable("id") Long id) {
        LOG.info("Delete {}", id);
        try {
            playerRepository.deleteById(id);
        } catch (Exception e) {
            LOG.error("Player not found" + e);
            throw new PlayerNotFoundException();
        }
    }

    private PlayerDTO entityToDto(Player player) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.id = player.getId();
        playerDTO.username = player.getUsername();

        return playerDTO;
    }
}
