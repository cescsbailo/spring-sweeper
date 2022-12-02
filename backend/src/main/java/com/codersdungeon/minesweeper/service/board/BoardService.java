package com.codersdungeon.minesweeper.service.board;

import com.codersdungeon.minesweeper.dto.cell.DiscoverCellDTO;
import com.codersdungeon.minesweeper.dto.cell.FlagCellResponseRightClickDTO;

public interface BoardService {

    public FlagCellResponseRightClickDTO rightClick(Long boardId, int row, int  column);


    DiscoverCellDTO discoverCells(Long boardId, int row, int column);
}
