package com.european_leagues.mappers;

import com.european_leagues.model.entities.PlayerEntity;
import com.european_leagues.openapi.model.PlayerDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = TeamMapper.class)
public interface PlayerMapper {

    @Mapping(target="id", source="id")
    @Mapping(target="name", source="name")
    @Mapping(target="numberOfMatches", source="numberOfMatches")
    @Mapping(target="position", source="position")
    @Mapping(target="team", source="team")
    PlayerEntity toPlayerEntity(PlayerDto dto);

    @Mapping(target="id", source="id")
    @Mapping(target="name", source="name")
    @Mapping(target="numberOfMatches", source="numberOfMatches")
    @Mapping(target="position", source="position")
    @Mapping(target="team", source="team")
    PlayerDto toPlayerDto(PlayerEntity entity);
}
