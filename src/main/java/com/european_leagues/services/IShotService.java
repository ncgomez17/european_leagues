package com.european_leagues.services;

import com.european_leagues.openapi.model.ShotDto;

import java.util.List;

public interface IShotService {

    List<ShotDto> getShots();
    ShotDto save(ShotDto dto);
    void deleteById(Integer id);
    ShotDto getById(Integer id);
    List<ShotDto> searchShot(String playerName);
}
