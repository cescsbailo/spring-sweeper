package com.codersdungeon.minesweeper.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column
    private int boardColumns;

    @Column
    private int mines;

    @Column
    private int boardRows;

    @OneToOne
    private Game game;

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<Cell> cells;


    public Long getBoardId() {
        return boardId;
    }

    public int getBoardColumns() {
        return boardColumns;
    }

    public void setBoardColumns(int boardColumns) {
        this.boardColumns = boardColumns;
    }

    public int getMines() {
        return mines;
    }

    public void setMines(int mines) {
        this.mines = mines;
    }

    public int getBoardRows() {
        return boardRows;
    }

    public void setBoardRows(int boardRows) {
        this.boardRows = boardRows;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Cell> getCells() {
        return cells;
    }

    public void setCells(List<Cell> cells) {
        this.cells = cells;
    }
}