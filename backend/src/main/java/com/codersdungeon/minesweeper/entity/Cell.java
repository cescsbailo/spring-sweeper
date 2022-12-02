package com.codersdungeon.minesweeper.entity;

import javax.persistence.*;

@Entity
public class Cell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cellId;
    @Column
    private int nColumn;
    @Column
    private int nRow;
    @Column
    private boolean bomb;
    @Column
    private boolean marked;
    @Column
    private boolean flagged;
    @Column
    private boolean visited;
    @Column
    private Integer totalMines;
    @Column
    private Long  nearBomb;
    @ManyToOne
    @JoinColumn (name = "boardId")
    private Board board;

    public Long getCellId() {
        return cellId;
    }

    public void setCellId(Long cellId) {
        this.cellId = cellId;
    }

    public int getnColumn() {
        return nColumn;
    }

    public void setnColumn(int nColumn) {
        this.nColumn = nColumn;
    }

    public int getnRow() {
        return nRow;
    }

    public void setnRow(int  nRow) {
        this.nRow = nRow;
    }

    public boolean isBomb() {
        return bomb;
    }

    public void setBomb(boolean bomb) {
        this.bomb = bomb;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }

    public boolean isFlagged() {
        return flagged;
    }

    public void setFlagged(boolean flagged) {
        this.flagged = flagged;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public Integer  getTotalMines() {
        return totalMines;
    }

    public void setTotalMines(Integer totalMines) {
        this.totalMines = totalMines;
    }

    public Long  getNearBomb() {
        return nearBomb;
    }

    public void setNearBomb(Long nearBomb) {
        this.nearBomb = nearBomb;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
