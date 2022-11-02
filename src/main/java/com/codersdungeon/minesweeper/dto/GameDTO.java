package com.codersdungeon.minesweeper.dto;

import java.time.Instant;

public class GameDTO {
     public Long gameId;
     public Long boardId;
     public Integer rows;
     public Integer columns;
     public Integer mines;
     public String player;
     public Long duration;
     public Instant startDate;
     public Instant endDate;
     public Boolean won;
     public Boolean lost;
}
