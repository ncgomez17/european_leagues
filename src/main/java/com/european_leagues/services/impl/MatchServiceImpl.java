package com.european_leagues.services.impl;

import com.european_leagues.mappers.MatchMapper;
import com.european_leagues.mappers.TeamMapper;
import com.european_leagues.model.entities.MatchEntity;
import com.european_leagues.model.repositories.IMatchRepository;
import com.european_leagues.openapi.model.MatchDto;
import com.european_leagues.services.IMatchService;
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
public class MatchServiceImpl implements IMatchService {

    @Autowired
    private IMatchRepository matchRepository;

    @Autowired
    private MatchMapper matchMapper;

    @Autowired
    private TeamMapper teamMapper;

    @Override
    public List<MatchDto> getMatchs(){
        return matchRepository.findAll().stream()
                .map(matchMapper::toMatchDto).collect(Collectors.toList());
    }

    @Override
    public MatchDto save(MatchDto matchDto){
        Objects.requireNonNull(matchDto);
        Objects.requireNonNull(matchDto.getDateMatch());

        MatchEntity matchEntity;
        if(Objects.nonNull(matchDto.getId())){
            matchEntity = this.matchRepository.findById(matchDto.getId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            String.format("The match with that id %d not exists",matchDto.getId())));
        }
        else{
            matchEntity = new MatchEntity();
            matchEntity.setId(this.matchRepository.getNextValId());
        }
        matchEntity.setDateMatch(matchDto.getDateMatch());
        matchEntity.setGoalsHomeTeam(matchDto.getGoalsHomeTeam());
        matchEntity.setGoalsVisitorTeam(matchDto.getGoalsVisitorTeam());
        matchEntity.setHomeTeam(teamMapper.toTeamEntity(matchDto.getHomeTeam()));
        matchEntity.setVisitorTeam(teamMapper.toTeamEntity(matchDto.getVisitorTeam()));
        matchRepository.save(matchEntity);
        return this.matchMapper.toMatchDto(matchEntity);
    }

    @Override
    public void deleteById(Integer id){
        Objects.requireNonNull(id);

        this.matchRepository.delete(this.matchRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The match with that id %d not exists",id))));
    }

    @Override
    public MatchDto getById(Integer id){
        Objects.requireNonNull(id);
        MatchEntity matchEntity = this.matchRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The match with that id %d not exists",id)));
        return this.matchMapper.toMatchDto(matchEntity);
    }


}
