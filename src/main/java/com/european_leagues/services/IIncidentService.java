package com.european_leagues.services;

import com.european_leagues.openapi.model.IncidentDto;

import java.util.List;

public interface IIncidentService {

    List<IncidentDto> getIncidents();
    IncidentDto save(IncidentDto dto);
    void deleteById(Integer id);
    IncidentDto getById(Integer id);
}
