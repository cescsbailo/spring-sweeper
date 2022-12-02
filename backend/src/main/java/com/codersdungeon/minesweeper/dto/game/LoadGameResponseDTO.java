package com.codersdungeon.minesweeper.dto.game;

import com.codersdungeon.minesweeper.dto.cell.CellDTO;
import com.codersdungeon.minesweeper.entity.Cell;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoadGameResponseDTO {
    public Long boardId;
    public int columns;
    public int rows;
    public int totalMines;

    public String player;
    public Long time;
    public Instant startDate;
    public boolean won;
    public boolean lost;
    public CellDTO[][] cells;

}
