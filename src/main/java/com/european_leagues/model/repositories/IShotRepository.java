package com.european_leagues.model.repositories;

import com.european_leagues.model.entities.ShotEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShotRepository extends JpaRepository<ShotEntity,Integer> {


    @Query(value = "SELECT COALESCE(MAX(c.id),0)+1 FROM ShotEntity c")
    Integer getNextValId();

    List<ShotEntity> findByPlayerNameContaining(String name);

}
