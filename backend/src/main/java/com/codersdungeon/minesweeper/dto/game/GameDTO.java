package com.codersdungeon.minesweeper.dto.game;

import com.codersdungeon.minesweeper.entity.Board;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameDTO {
    public Long gameId;

     public int columns;
     public int rows;
     public int mines;

    public Long time;
    public boolean won;
    public boolean lost;

    public Long playerId;



}
