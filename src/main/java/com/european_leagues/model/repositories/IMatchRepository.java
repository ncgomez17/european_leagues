package com.european_leagues.model.repositories;

import com.european_leagues.model.entities.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IMatchRepository extends JpaRepository<MatchEntity,Integer> {

    @Query(value = "SELECT COALESCE(MAX(c.id),0)+1 FROM MatchEntity c")
    Integer getNextValId();
}
