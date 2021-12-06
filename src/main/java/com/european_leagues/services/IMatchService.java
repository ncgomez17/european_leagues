package com.european_leagues.services;

import com.european_leagues.openapi.model.MatchDto;
import com.european_leagues.openapi.model.TeamDto;

import java.util.List;

public interface IMatchService {

    List<MatchDto> getMatchs();
    MatchDto save(MatchDto dto);
    void deleteById(Integer id);
    MatchDto getById(Integer id);
}
