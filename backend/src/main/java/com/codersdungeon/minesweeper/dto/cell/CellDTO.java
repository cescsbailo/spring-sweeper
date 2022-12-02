package com.codersdungeon.minesweeper.dto.cell;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CellDTO {

    public Integer row;
    public Integer column;
    public Long nearBombs;
    public Boolean flagged;
    public Boolean marked;
    public Boolean visited;
    public Boolean bomb;

    public Integer totalmines;

}
