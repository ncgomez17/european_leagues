package com.european_leagues.services;

import com.european_leagues.openapi.model.TeamDto;

import java.util.List;

public interface ITeamService {
    List<TeamDto> getTeams();
    TeamDto save(TeamDto dto);
    void deleteById(Integer id);
    TeamDto getById(Integer id);
}
