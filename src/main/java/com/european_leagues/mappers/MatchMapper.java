package com.european_leagues.mappers;

import com.european_leagues.model.entities.MatchEntity;
import com.european_leagues.openapi.model.MatchDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses=TeamMapper.class)
public interface MatchMapper {

    @Mapping(target="id", source="id")
    @Mapping(target="dateMatch", source="dateMatch")
    @Mapping(target="goalsHomeTeam", source="goalsHomeTeam")
    @Mapping(target="goalsVisitorTeam", source="goalsVisitorTeam")
    @Mapping(target="homeTeam", source="homeTeam")
    @Mapping(target="visitorTeam", source="visitorTeam")
    MatchEntity toMatchEntity(MatchDto dto);

    @Mapping(target="id", source="id")
    @Mapping(target="dateMatch", source="dateMatch")
    @Mapping(target="goalsHomeTeam", source="goalsHomeTeam")
    @Mapping(target="goalsVisitorTeam", source="goalsVisitorTeam")
    @Mapping(target="homeTeam", source="homeTeam")
    @Mapping(target="visitorTeam", source="visitorTeam")
    MatchDto toMatchDto(MatchEntity entity);
}
