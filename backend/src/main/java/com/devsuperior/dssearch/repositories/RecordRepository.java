package com.devsuperior.dssearch.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RecordRepository extends JpaRepository<com.devsuperior.dssearch.entities.Record, Long>{
 
}
