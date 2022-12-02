package com.codersdungeon.minesweeper.controller;

import com.codersdungeon.minesweeper.dto.cell.DiscoverCellDTO;
import com.codersdungeon.minesweeper.dto.cell.FlagCellResponseRightClickDTO;
import com.codersdungeon.minesweeper.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class BoardController {
    @Autowired
    BoardService boardService;

    @PutMapping("/board/{boardId}/cell/{row}/{column}/flag")
    public FlagCellResponseRightClickDTO firstClick(@PathVariable("boardId") Long boardId, @PathVariable("row") int row, @PathVariable("column") int column) {
        return boardService.rightClick(boardId, row, column);
    }
    @PutMapping("/board/{boardId}/cell/{row}/{column}/discover")
    public DiscoverCellDTO discoverCell(@PathVariable("boardId")Long boardId, @PathVariable("row") int row, @PathVariable("column") int column){
        return boardService.discoverCells(boardId,row,column);

    }



}
