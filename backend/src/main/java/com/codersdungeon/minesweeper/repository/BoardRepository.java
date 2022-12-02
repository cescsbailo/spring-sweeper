package com.codersdungeon.minesweeper.repository;

import com.codersdungeon.minesweeper.entity.Board;
import com.codersdungeon.minesweeper.entity.Cell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}