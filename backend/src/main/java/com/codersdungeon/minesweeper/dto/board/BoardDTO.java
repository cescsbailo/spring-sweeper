package com.codersdungeon.minesweeper.dto.board;

import com.codersdungeon.minesweeper.dto.cell.CellDTO;
import com.codersdungeon.minesweeper.dto.game.GameDTO;
import com.codersdungeon.minesweeper.entity.Cell;

public class BoardDTO {
    public Long id;


    public int boardColumns;


    public int mines;


    public int boardRows;


    public CellDTO[][] celle;
}
