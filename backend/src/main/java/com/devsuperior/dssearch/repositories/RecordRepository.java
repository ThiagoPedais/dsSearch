package com.devsuperior.dssearch.repositories;

import java.time.Instant;
import com.devsuperior.dssearch.entities.Record;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface RecordRepository extends JpaRepository<com.devsuperior.dssearch.entities.Record, Long> {
 
	@Query("SELECT obj FROM com.devsuperior.dssearch.entities.Record obj WHERE "
			+ "(coalesce(:min, null) IS NULL OR obj.moment >= :min) AND "
			+ "(coalesce(:max, null) IS NULL OR obj.moment <= :max) ")
	Page<com.devsuperior.dssearch.entities.Record> findByMoments(Instant min, Instant max, Pageable pageable);
}
