package com.codersdungeon.minesweeper.service.board;

import com.codersdungeon.minesweeper.dto.board.BoardDTO;
import com.codersdungeon.minesweeper.dto.cell.CellDTO;
import com.codersdungeon.minesweeper.dto.cell.DiscoverCellDTO;
import com.codersdungeon.minesweeper.dto.cell.FlagCellResponseRightClickDTO;
import com.codersdungeon.minesweeper.entity.Board;
import com.codersdungeon.minesweeper.entity.Cell;
import com.codersdungeon.minesweeper.entity.Game;
import com.codersdungeon.minesweeper.exception.GameNotFoundException;
import com.codersdungeon.minesweeper.repository.BoardRepository;
import com.codersdungeon.minesweeper.repository.CellRepository;
import com.codersdungeon.minesweeper.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultBoardService implements BoardService {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    CellRepository cellRepository;
    @Autowired
    GameRepository gameRepository;

    @Override
    public DiscoverCellDTO discoverCells(Long boardId, int row, int column) {
        DiscoverCellDTO response = new DiscoverCellDTO();
        BoardDTO boardDTO;
        Board board = boardRepository.findById(boardId).orElseThrow(GameNotFoundException::new);
        boardDTO = boardRepository.findById(boardId).map(this::entityToLoadBoardDto).orElseThrow(GameNotFoundException::new);
        Game game = board.getGame();
        List<Cell> lista = board.getCells();
        Cell[][] cellone = listToArrayEntity(lista, board.getBoardRows(), board.getBoardColumns());
        Cell cella = cellone[row][column];

        /* TROVARE CELLE VISITATE */
        List<Cell> visitate = new ArrayList<>();
        for (Cell cell : lista) {
            if (cell.isVisited()) {
                visitate.add(cell);
            }
        }
        int celleVisitate = visitate.size();
        int celleTotali = lista.size();
        int mineTot = cella.getTotalMines();
        int celleDisponibili = celleTotali - (mineTot + celleVisitate);

        /*CASO 1: PARTITA PERSA */
        if (cella.isBomb()) {
            game.setLost(true);
            response.lost = true;
            cella.setVisited(true);
            cella.setFlagged(false);
            Instant stopTime = Instant.now();
            Long time = Duration.between(game.getStartDate(), stopTime).toMillis();
            game.setTime(time);
            gameRepository.save(game);
            List<CellDTO> listaDto = board.getCells().stream().map(this::cellToCellDto).collect(Collectors.toList());
            CellDTO[] cellsDto = listaDto.stream().toArray(CellDTO[]::new);
            response.cells = cellsDto;

            /* CASO 2 : CELLA NON BOMBA E NEAR MINE --> DISCOVER 1 CELLA */
        } else if (!cella.isBomb() && cella.getNearBomb() > 0 && celleDisponibili > 1) {
            if (cella.isFlagged()) {
                cella.getBoard().setMines(board.getMines() + 1);
                cella.setFlagged(false);
            }
            cella.setVisited(true);
            gameRepository.save(game);
            CellDTO dto = cellToCellDto(cella);
            List<CellDTO> listaDto = new ArrayList<>();
            listaDto.add(dto);
            CellDTO[] cellsDto = listaDto.stream().toArray(CellDTO[]::new);
            response.cells = cellsDto;

            /* CASO 3 : CELLA NON BOMBA E NON NEAR MINE --> DISCOVER BLOCCO CELLE */
        } else if (!cella.isBomb() && cella.getNearBomb() == 0 && !cella.isVisited() && celleDisponibili > 1) {
            clearNear(cellone, row, column, board.getBoardRows(), board.getBoardColumns());
            gameRepository.saveAndFlush(game);
            List<Cell> respList = board.getCells();
            List<Cell> visited = new ArrayList<>();
            for (Cell cell : respList) {
                if (cell.isVisited()) {
                    visited.add(cell);
                }
            }
            List<CellDTO> dtoList = visited.stream().map(this::cellToCellDto).collect(Collectors.toList());
            CellDTO[] cellsDto = dtoList.stream().toArray(CellDTO[]::new);
            response.cells = cellsDto;

            /* CASO 4: PARTITA VINTA */
        } else if (!cella.isBomb() && celleDisponibili == 1) {
            game.setWon(true);
            response.won = true;
            cella.setVisited(true);
            gameRepository.save(game);
            Instant stopTime = Instant.now();
            Long time = Duration.between(game.getStartDate(), stopTime).toMillis();
            game.setTime(time);
            List<CellDTO> listaDto = board.getCells().stream().map(this::cellToCellDto).collect(Collectors.toList());
            for (CellDTO c : listaDto) {
                c.flagged = false;
            }
            CellDTO[] cellsDto = listaDto.stream().toArray(CellDTO[]::new);
            response.cells = cellsDto;
        }
        return response;
    }

    @Override
    public FlagCellResponseRightClickDTO rightClick(Long boardId, int row, int column) {
        FlagCellResponseRightClickDTO response = new FlagCellResponseRightClickDTO();
        BoardDTO boardDTO;
        Board board = boardRepository.findById(boardId).orElseThrow(GameNotFoundException::new);
        boardDTO = boardRepository.findById(boardId).map(this::entityToLoadBoardDto).orElseThrow(GameNotFoundException::new);
        CellDTO cella = boardDTO.celle[row][column];
        int tot;
        response.marked = cella.marked;
        response.flagged = cella.flagged;
        response.totalMines = board.getMines();

        if (cella.visited) {
            cella.visited = true;
        } else {
            if (!response.flagged && !response.marked) {
                response.flagged = true;
                response.marked = false;
                tot = response.totalMines = response.totalMines - 1;
                board.setMines(tot);

            } else if (response.flagged && !response.marked) {
                response.flagged = false;
                response.marked = true;
                tot = response.totalMines = response.totalMines + 1;
                board.setMines(tot);

            } else if (!response.flagged && response.marked) {
                response.flagged = false;
                response.marked = false;
                tot = board.getMines();
                board.setMines(tot);

            }
            boardRepository.save(board);
            List<Cell> cells = board.getCells();
            for (Cell cell2 : cells) {
                if (cell2.getnColumn() == column && cell2.getnRow() == row) {
                    cell2.setMarked(response.marked);
                    cell2.setFlagged(response.flagged);
                    cellRepository.save(cell2);

                }
            }
            return response;
        }
        return response;
    }

    /* ----METODI DI UTILITA'---- */
    public BoardDTO entityToLoadBoardDto(Board board) {
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.id = board.getBoardId();
        boardDTO.boardRows = board.getBoardRows();
        boardDTO.boardColumns = board.getBoardColumns();
        boardDTO.mines = board.getMines();
        List<CellDTO> listCelle = board.getCells().stream().map(this::cellToCellDto).collect(Collectors.toList());
        boardDTO.celle = listToArray(listCelle, boardDTO.boardRows, boardDTO.boardColumns);
        return boardDTO;
    }

    public CellDTO[][] listToArray(List<CellDTO> cellsList, int row, int column) {
        CellDTO[][] celle = new CellDTO[row][column];
        for (CellDTO cell : cellsList) {
            celle[cell.row][cell.column] = cell;
        }
        return celle;
    }

    public Cell[][] listToArrayEntity(List<Cell> cellsList, int row, int column) {
        Cell[][] celle = new Cell[row][column];
        for (Cell cell : cellsList) {
            celle[cell.getnRow()][cell.getnColumn()] = cell;
        }
        return celle;
    }

    public void clearNear(Cell[][] cells, int row, int column, int rowMax, int columnMax) {
        if (row < 0 || row >= rowMax || column < 0 || column >= columnMax) {
            return;
        }

        if (!cells[row][column].isBomb() && !cells[row][column].isVisited()) {
            if (cells[row][column].getNearBomb() == 0) {
                cells[row][column].setVisited(true);
                cells[row][column].setFlagged(false);
                clearNear(cells, row + 1, column, rowMax, columnMax);
                clearNear(cells, row + 1, column + 1, rowMax, columnMax);
                clearNear(cells, row + 1, column - 1, rowMax, columnMax);
                clearNear(cells, row - 1, column, rowMax, columnMax);
                clearNear(cells, row - 1, column - 1, rowMax, columnMax);
                clearNear(cells, row - 1, column + 1, rowMax, columnMax);
                clearNear(cells, row, column - 1, rowMax, columnMax);
                clearNear(cells, row, column + 1, rowMax, columnMax);
            } else {
                cells[row][column].setVisited(true);
                cells[row][column].setFlagged(false);
            }
        } else {
            return;
        }
    }
    public CellDTO cellToCellDto(Cell cell) {
        CellDTO cella = new CellDTO();
        cella.row = cell.getnRow();
        cella.column = cell.getnColumn();
        cella.nearBombs = cell.getNearBomb();
        cella.flagged = cell.isFlagged();
        cella.marked = cell.isMarked();
        cella.bomb = cell.isBomb();
        cella.visited = cell.isVisited();
        return cella;
    }
}
