package com.codersdungeon.minesweeper.dto;

import java.time.Instant;
import java.util.List;

public class DiscoverResponseDTO {
    public Boolean won;
    public Boolean lost;
    public Long duration;
    public Instant endTime;
    public List<CellDTO> cells;
}
