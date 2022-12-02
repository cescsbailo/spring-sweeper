package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.player.PlayerDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerListDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerRequestDTO;
import com.codersdungeon.minesweeper.dto.player.PlayerResponseDTO;
import com.codersdungeon.minesweeper.service.player.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {
    private static final Logger LOG = LoggerFactory.getLogger(PlayerController.class);
    @Autowired
    private PlayerService playerService;

    @GetMapping("/{id}")
    @ResponseBody
    public PlayerDTO findById(@PathVariable("id") Long id) {
        return playerService.findById(id);
    }

    @GetMapping("/")
    public PlayerListDTO findByAll() {
        return playerService.findByAll();
    }

    @GetMapping("/findby/{username}")
    @ResponseBody
    public PlayerDTO findByUsername(@PathVariable("username") String username){
        return playerService.findByUsername(username);
    }
    @GetMapping("/userpsw")
    @ResponseBody
    public PlayerDTO findByUsernameAndPassword(@RequestBody PlayerRequestDTO request){
        return playerService.findByUsernameAndPassword(request);
    }

    @PostMapping("/")
    public PlayerResponseDTO createPlayer(@RequestBody PlayerRequestDTO request) {
        return playerService.createPlayer(request);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public PlayerResponseDTO updatePlayer(@PathVariable("id") Long id,@RequestBody PlayerRequestDTO request) {
        return playerService.updatePlayer(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePlayer(@PathVariable("id") Long id) {
        playerService.deletePlayer(id);
    }
}
