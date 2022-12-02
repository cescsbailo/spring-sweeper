package com.codersdungeon.minesweeper.service.game;

import com.codersdungeon.minesweeper.dto.cell.CellDTO;
import com.codersdungeon.minesweeper.dto.game.*;
import com.codersdungeon.minesweeper.entity.Board;
import com.codersdungeon.minesweeper.entity.Cell;
import com.codersdungeon.minesweeper.entity.Game;
import com.codersdungeon.minesweeper.exception.GameNotFoundException;
import com.codersdungeon.minesweeper.repository.BoardRepository;
import com.codersdungeon.minesweeper.repository.CellRepository;
import com.codersdungeon.minesweeper.repository.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.Instant;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
public class DefaultGameService implements GameService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultGameService.class);
    @Autowired
    GameRepository gameRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    CellRepository cellRepository;

    /**
     * @param id Game
     * @return LoadGameResponseDTO
     * Chiamata GET gameController/loadGame
     */
    @Override
    public LoadGameResponseDTO loadGame(Long id) {
        Instant timeNow = Instant.now();
        Game game = gameRepository.findById(id).orElseThrow(GameNotFoundException::new);
        Instant resetTime = timeNow.minusMillis(game.getTime());
        game.setStartDate(resetTime);
        gameRepository.save(game);
        return entityToLoadGameDto(game);
    }

    /**
     * @return GameListDTO
     * Chiamata GET gameController/gamesList
     */
    @Override
    public GameListDTO findByAll() {
        List<GameDTO> giochi = gameRepository.findAll().stream().map(this::entityToGameDto).collect(Collectors.toList());
        GameListDTO result = new GameListDTO();
        result.games = giochi;
        return result;
    }

    /**
     * Chiamata POST gameController.newGame
     *
     * @param gameRequest DTO
     * @return GameResponse DTO
     */
    @Override
    public GameResponseDTO createGame(GameRequestDTO gameRequest) {
        /*---CREO GAME E BOARD---*/
        Game game = new Game();
        game.setTime(1L);
        Board board = new Board();
        List<Cell> cellsList = new ArrayList<>();
        board.setBoardColumns(gameRequest.columns);
        board.setBoardRows(gameRequest.rows);
        board.setMines(gameRequest.mines);
        board.setGame(game);

        /*---CREO CELLE---*/
        Cell[][] celle;
        celle = new Cell[gameRequest.rows][];
        for (int i = 0; i < gameRequest.rows; i++) {
            celle[i] = new Cell[gameRequest.columns];
            for (int j = 0; j < gameRequest.columns; j++) {
                celle[i][j] = new Cell();
                Cell cella = celle[i][j];
                cella.setnRow(i);
                cella.setnColumn(j);
                cella.setBoard(board);
                cella.setTotalMines(board.getMines());
                cellsList.add(cella);
            }
        }
        /*---AGGIUNGO MINE RANDOM---*/
        randomMines(gameRequest, celle);
        board.setCells(cellsList);
        game.setBoard(board);
        /*---SETTO NEAR BOMB---*/
        List<Cell> lista = game.getBoard().getCells();
        Cell[][] arrayCelle = listToArrayEntity(lista, gameRequest.rows, gameRequest.columns);
        for (int i = 0; i < gameRequest.rows; i++) {
            for (int j = 0; j < gameRequest.columns; j++) {
                Long x = minesNear(arrayCelle, i, j, gameRequest.rows, gameRequest.columns);
                arrayCelle[i][j].setNearBomb(x);
            }
        }
        board.setCells(cellsList);
        game.setBoard(board);
        game = gameRepository.save(game);

        GameResponseDTO response = new GameResponseDTO();
        response.gameId = game.getGameId();
        return response;
    }

    public StartGameResponseDTO startGame(Long gameId) {
        StartGameResponseDTO startGameResponse = new StartGameResponseDTO();

        Game game = gameRepository.findById(gameId).orElseThrow(GameNotFoundException::new);
        game.setStartDate(Instant.now());
        game.setTime(0L);
        gameRepository.save(game);

        startGameResponse.startGame = game.getStartDate();
        return startGameResponse;
    }

    @Override
    public void deleteGame(Long id) {
        LOG.info("Delete {}", id);
        gameRepository.deleteById(id);
    }

    @Override
    public void pauseGame(Long gameId) {
        Instant pauseTime = Instant.now();
        Game game = gameRepository.findById(gameId).orElseThrow(GameNotFoundException::new);

        Long time = Duration.between(game.getStartDate(), pauseTime).toMillis();

        game.setTime(time);
        game.setStartDate(pauseTime);

        gameRepository.save(game);
    }

    /* ---- METODI DI UTILITA' ---- */
    public GameDTO entityToGameDto(Game game) {
        GameDTO dto = new GameDTO();

        dto.gameId = game.getGameId();
        dto.won = game.isWon();
        dto.lost = game.isLost();
        dto.columns = game.getBoard().getBoardColumns();
        dto.rows = game.getBoard().getBoardRows();
        dto.mines = game.getBoard().getMines();
        dto.time = game.getTime();
        return dto;
    }

    public LoadGameResponseDTO entityToLoadGameDto(Game game) {
        LoadGameResponseDTO dto = new LoadGameResponseDTO();



        dto.boardId = game.getBoard().getBoardId();
        dto.columns = game.getBoard().getBoardColumns();
        dto.rows = game.getBoard().getBoardRows();
        dto.totalMines = game.getBoard().getMines();
        dto.time = game.getTime();
        dto.player = SecurityContextHolder.getContext().getAuthentication().getName();
        dto.startDate = game.getStartDate();
        dto.won = game.isWon();
        dto.lost = game.isLost();
        List<CellDTO> lista = game.getBoard().getCells().stream().map(this::cellToCellDto).collect(Collectors.toList());
        dto.cells = listToArray(lista, dto.rows, dto.columns);

        return dto;
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

    public CellDTO cellToCellDto(Cell cell) {
        CellDTO cella = new CellDTO();
        cella.row = cell.getnRow();
        cella.column = cell.getnColumn();
        cella.nearBombs = cell.getNearBomb();
        cella.flagged = cell.isFlagged();
        cella.marked = cell.isMarked();
        cella.bomb = cell.isBomb();
        cella.visited = cell.isVisited();
        cella.totalmines = cell.getTotalMines();
        return cella;
    }

    public void randomMines(GameRequestDTO gameRequest, Cell[][] cells) {
        int minesPlaced = 0;
        Random random = new Random();
        while (minesPlaced < gameRequest.mines) {
            int x = random.nextInt(gameRequest.columns);
            int y = random.nextInt(gameRequest.rows);
            if (!cells[y][x].isBomb()) {
                cells[y][x].setBomb(true);
                minesPlaced++;
            }
        }
    }

    public Long minesNear(Cell[][] cells, int row, int column, int rowMax, int columnMax) {
        Long mines = 0L;
        mines += mineAt(cells, row - 1, column - 1, rowMax, columnMax);
        mines += mineAt(cells, row - 1, column, rowMax, columnMax);
        mines += mineAt(cells, row - 1, column + 1, rowMax, columnMax);
        mines += mineAt(cells, row, column - 1, rowMax, columnMax);
        mines += mineAt(cells, row, column + 1, rowMax, columnMax);
        mines += mineAt(cells, row + 1, column - 1, rowMax, columnMax);
        mines += mineAt(cells, row + 1, column + 1, rowMax, columnMax);
        mines += mineAt(cells, row + 1, column, rowMax, columnMax);
        return mines;
    }

    public Long mineAt(Cell[][] cells, int row, int column, int rowMax, int columnMax) {
        if (row >= 0 && row < rowMax && column >= 0 && column < columnMax && cells[row][column].isBomb()) {
            return 1L;
        } else {
            return 0L;
        }
    }
}