package com.codersdungeon.minesweeper.dto.cell;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiscoverCellDTO {

    public boolean lost;

    public boolean won;
    public CellDTO[] cells;
}
