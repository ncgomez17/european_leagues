package com.european_leagues.services;

import com.european_leagues.openapi.model.IncidentDto;

import java.text.ParseException;
import java.util.List;

public interface IIncidentService {

    List<IncidentDto> getIncidents();
    IncidentDto save(IncidentDto dto) throws ParseException;
    void deleteById(Integer id);
    IncidentDto getById(Integer id);
    List<IncidentDto> searchIncident(String playerName);
}
