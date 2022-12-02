package com.codersdungeon.minesweeper.dto.cell;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiscoverCellWithBombDTO {

    public boolean lost;

    public CellDTO[][] cells;
}
