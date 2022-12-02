package com.codersdungeon.minesweeper.dto.player;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerDTO {
    public Long id;
    public String password;
    public String username;
}
