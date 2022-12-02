package com.codersdungeon.minesweeper.entity;

import javax.persistence.*;
import java.time.Instant;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @OneToOne(cascade = {CascadeType.ALL})
    private Board board;
    @Column
    private Long time;
    @Column
    private boolean won;
    @Column
    private boolean lost;
    @Column
    private Instant startDate;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    public Long getGameId() {
        return gameId;
    }


    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public boolean isWon() {
        return won;
    }

    public void setWon(boolean won) {
        this.won = won;
    }

    public boolean isLost() {
        return lost;
    }

    public void setLost(boolean lost) {
        this.lost = lost;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public void setGameId(Long id) {
    }
}
