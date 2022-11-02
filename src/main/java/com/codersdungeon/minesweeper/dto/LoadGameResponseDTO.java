package com.codersdungeon.minesweeper.dto;

import java.time.Instant;
import java.util.List;

public class LoadGameResponseDTO {
    public Long gameId;
    public Long boardId;
    public Integer rows;
    public Integer columns;
    public Integer totalCells;
    public Integer totalMines;
    public Integer discoveredCells;
    public Integer flaggedMines;
    public String player;
    public Long duration;
    public Instant startDate;
    public Instant endDate;
    public Boolean won;
    public Boolean lost;
    public List<CellDTO> cells;
}
