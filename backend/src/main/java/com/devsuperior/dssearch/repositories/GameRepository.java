package com.devsuperior.dssearch.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dssearch.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

}
