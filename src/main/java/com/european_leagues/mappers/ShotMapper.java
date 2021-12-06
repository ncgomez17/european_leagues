package com.european_leagues.mappers;

import com.european_leagues.model.entities.ShotEntity;
import com.european_leagues.openapi.model.ShotDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {MatchMapper.class,PlayerMapper.class})
public interface ShotMapper {

    @Mapping(target="id", source="id")
    @Mapping(target="minute", source="minute")
    @Mapping(target="result", source="result")
    @Mapping(target="site", source="site")
    @Mapping(target="match", source="match")
    @Mapping(target="player", source="player")
    @Mapping(target="playerAssisted", source="playerAssisted")
    ShotEntity toShotEntity(ShotDto dto);

    @Mapping(target="id", source="id")
    @Mapping(target="minute", source="minute")
    @Mapping(target="result", source="result")
    @Mapping(target="site", source="site")
    @Mapping(target="match", source="match")
    @Mapping(target="player", source="player")
    @Mapping(target="playerAssisted", source="playerAssisted")
    ShotDto toShotDto(ShotEntity entity);
}
