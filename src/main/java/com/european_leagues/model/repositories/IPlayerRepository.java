package com.european_leagues.model.repositories;

import com.european_leagues.model.entities.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPlayerRepository extends JpaRepository<PlayerEntity,Integer> {

    Optional<PlayerEntity> findByName(String name);

    @Query(value = "SELECT COALESCE(MAX(c.id),0)+1 FROM PlayerEntity c")
    Integer getNextValId();
}
