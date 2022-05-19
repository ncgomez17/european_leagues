package com.european_leagues.model.repositories;

import com.european_leagues.model.entities.IncidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IIncidentRepository extends JpaRepository<IncidentEntity,Integer> {

    @Query(value = "SELECT COALESCE(MAX(c.id),0)+1 FROM IncidentEntity c")
    Integer getNextValId();
    List<IncidentEntity> findByPlayerNameContaining(String name);

}
