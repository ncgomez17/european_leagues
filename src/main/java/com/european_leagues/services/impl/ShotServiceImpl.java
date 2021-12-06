package com.european_leagues.services.impl;

import com.european_leagues.mappers.MatchMapper;
import com.european_leagues.mappers.PlayerMapper;
import com.european_leagues.mappers.ShotMapper;
import com.european_leagues.model.entities.ShotEntity;
import com.european_leagues.model.repositories.IShotRepository;
import com.european_leagues.openapi.model.ShotDto;
import com.european_leagues.services.IShotService;
import com.european_leagues.utils.enums.Site;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class ShotServiceImpl implements IShotService {

    @Autowired
    private IShotRepository shotRepository;

    @Autowired
    private ShotMapper shotMapper;

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private MatchMapper matchMapper;

    @Override
    public List<ShotDto> getShots(){
        return shotRepository.findAll().stream()
                .map(shotMapper::toShotDto).collect(Collectors.toList());
    }

    @Override
    public ShotDto save(ShotDto shotDto){
        Objects.requireNonNull(shotDto);
        Objects.requireNonNull(shotDto.getResult());
        Objects.requireNonNull(shotDto.getPlayer());

        ShotEntity shotEntity;
        if(Objects.nonNull(shotDto.getId())){
            shotEntity = this.shotRepository.findById(shotDto.getId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            String.format("The shot with that id %d not exists",shotDto.getId())));
        }
        else{
            shotEntity = new ShotEntity();
            shotEntity.setId(this.shotRepository.getNextValId());
        }
        shotEntity.setMatch(matchMapper.toMatchEntity(shotDto.getMatch()));
        shotEntity.setMinute(shotDto.getMinute());
        shotEntity.setPlayer(playerMapper.toPlayerEntity(shotDto.getPlayer()));
        shotEntity.setResult(shotDto.getResult());
        shotEntity.setPlayerAssisted(playerMapper.toPlayerEntity(shotDto.getPlayerAssisted()));
        shotEntity.setSite(Site.valueOf(shotDto.getSite().getValue()));
        shotRepository.save(shotEntity);
        return this.shotMapper.toShotDto(shotEntity);
    }

    @Override
    public void deleteById(Integer id){
        Objects.requireNonNull(id);

        this.shotRepository.delete(this.shotRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The shot with that id %d not exists",id))));
    }

    @Override
    public ShotDto getById(Integer id){
        Objects.requireNonNull(id);
        ShotEntity shotEntity = this.shotRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The shot with that id %d not exists",id)));
        return this.shotMapper.toShotDto(shotEntity);
    }
}
