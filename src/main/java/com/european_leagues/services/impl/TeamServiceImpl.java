package com.european_leagues.services.impl;

import com.european_leagues.mappers.PlayerMapper;
import com.european_leagues.mappers.TeamMapper;
import com.european_leagues.model.entities.TeamEntity;
import com.european_leagues.model.repositories.ITeamRepository;
import com.european_leagues.openapi.model.TeamDto;
import com.european_leagues.services.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TeamServiceImpl implements ITeamService {

    @Autowired
    private ITeamRepository teamRepository;

    @Autowired
    private TeamMapper teamMapper;

    @Autowired
    private PlayerMapper playerMapper;


    @Override
    public List<TeamDto> getTeams(){
        return teamRepository.findAll().stream()
                .map(teamMapper::toTeamDto).collect(Collectors.toList());
    }

    @Override
    public TeamDto save(TeamDto teamDto){
        Objects.requireNonNull(teamDto);
        Objects.requireNonNull(teamDto.getName());
        Objects.requireNonNull(teamDto.getLeague());

        Optional<TeamEntity> teamEntityOptional = this.teamRepository.findByName(teamDto.getName())
                .filter(e -> Boolean.FALSE.equals(e.getId().equals(teamDto.getId())));

        if(teamEntityOptional.isPresent()){
            throw  new ResponseStatusException(
                    HttpStatus.CONFLICT, String.format("The team with that name %s already exists",teamDto.getName()));
        }
        TeamEntity teamEntity;
        if(Objects.nonNull(teamDto.getId())){
            teamEntity = this.teamRepository.findById(teamDto.getId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("The team with that id %d not exists",teamDto.getId())));
        }
        else{
            teamEntity = new TeamEntity();
            teamEntity.setId(this.teamRepository.getNextValId());
        }
        teamEntity.setName(teamDto.getName());
        teamEntity.setLeague(teamDto.getLeague());
        teamEntity.setNumberOfPlayers(teamDto.getNumberOfPlayers());

        teamRepository.save(teamEntity);
        return this.teamMapper.toTeamDto(teamEntity);
    }

    @Override
    public void deleteById(Integer id){
        Objects.requireNonNull(id);
        this.teamRepository.delete(this.teamRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The team with that id %d not exists",id))));

    }

    @Override
    public TeamDto getById(Integer id){
        Objects.requireNonNull(id);
        TeamEntity teamEntity = this.teamRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The team with that id %d not exists",id)));
        return this.teamMapper.toTeamDto(teamEntity);
    }

    @Override
    public List<TeamDto> searchTeam(String name){
        Objects.requireNonNull(name);
        List<TeamEntity> teamsEntities = this.teamRepository.findByNameContaining(name);

        return teamsEntities.stream().map(teamMapper::toTeamDto).collect(Collectors.toList());
    }
}
