package com.european_leagues.services;

import com.european_leagues.openapi.model.PlayerDto;

import java.util.List;

public interface IPlayerService {

    List<PlayerDto> getPlayers();
    PlayerDto save(PlayerDto dto);
    void deleteById(Integer id);
    PlayerDto getById(Integer id);
}
