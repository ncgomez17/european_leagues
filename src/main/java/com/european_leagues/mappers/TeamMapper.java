package com.european_leagues.mappers;

import com.european_leagues.model.entities.TeamEntity;
import com.european_leagues.openapi.model.TeamDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = PlayerMapper.class )
public interface TeamMapper {

    @Mapping(target="id", source="id")
    @Mapping(target="name", source="name")
    @Mapping(target="numberOfPlayers", source="numberOfPlayers")
    @Mapping(target="league", source="league")
    @Mapping(target="players", source="players")
    TeamEntity toTeamEntity(TeamDto dto);

    @Mapping(target="id", source="id")
    @Mapping(target="name", source="name")
    @Mapping(target="numberOfPlayers", source="numberOfPlayers")
    @Mapping(target="league", source="league")
    @Mapping(target="players", source="players")
    TeamDto toTeamDto(TeamEntity entity);
}
