package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.CellDTO;
import com.codersdungeon.minesweeper.dto.DiscoverResponseDTO;
import com.codersdungeon.minesweeper.dto.FlagResponseDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1/board")
public class BoardController {

    @PutMapping("/{boardId}/cell/{row}/{column}/flag")
    public FlagResponseDTO flag(@PathVariable(name = "boardId") long boardId, @PathVariable(name = "row") long row,@PathVariable(name = "column") long column){
        FlagResponseDTO response = new FlagResponseDTO();
        response.flagged = false;
        response.marked = true;
        return response;
    }

    @PutMapping("/{boardId}/cell/{row}/{column}/discover")
    public DiscoverResponseDTO discover(@PathVariable(name = "boardId") long boardId, @PathVariable(name = "row") long row, @PathVariable(name = "column") long column){
        DiscoverResponseDTO response = new DiscoverResponseDTO();
        response.won = false;
        response.lost = true;
        response.duration = ChronoUnit.MINUTES.getDuration().toMillis();
        response.endTime = Instant.now();

        CellDTO cell = new CellDTO();
        cell.row = 0;
        cell.columns = 0;
        cell.nearBombs = 0;
        cell.flagged = false;
        cell.marked = false;
        cell.visited = true;
        cell.bomb = true;

        response.cells = Collections.singletonList(cell);

        return response;
    }
}
