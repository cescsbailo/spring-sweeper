package com.codersdungeon.minesweeper.repository;

import com.codersdungeon.minesweeper.entity.Cell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CellRepository extends JpaRepository<Cell, Long> {
}