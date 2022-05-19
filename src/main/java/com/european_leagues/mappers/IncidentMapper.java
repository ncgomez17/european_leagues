package com.european_leagues.mappers;

import com.european_leagues.model.entities.IncidentEntity;
import com.european_leagues.openapi.model.IncidentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = PlayerMapper.class)
public interface IncidentMapper {

    @Mapping(target="id", source="id")
    @Mapping(target="incidentType", source="incidentType")
    @Mapping(target="date", source="date")
    @Mapping(target="player", source="player")
    IncidentEntity toIncidentEntity(IncidentDto dto);

    @Mapping(target="id", source="id")
    @Mapping(target="incidentType", source="incidentType")
    @Mapping(target="date", source="date")
    @Mapping(target="player", source="player")
    IncidentDto toIncidentDto(IncidentEntity entity);
}
