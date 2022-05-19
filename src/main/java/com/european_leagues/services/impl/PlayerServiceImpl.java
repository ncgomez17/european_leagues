package com.european_leagues.services.impl;

import com.european_leagues.mappers.PlayerMapper;
import com.european_leagues.mappers.TeamMapper;
import com.european_leagues.model.entities.PlayerEntity;
import com.european_leagues.model.repositories.IPlayerRepository;
import com.european_leagues.openapi.model.PlayerDto;
import com.european_leagues.services.IPlayerService;
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
public class PlayerServiceImpl implements IPlayerService {

    @Autowired
    private IPlayerRepository playerRepository;

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private TeamMapper teamMapper;

    @Override
    public List<PlayerDto> getPlayers(){
        return playerRepository.findAll().stream()
                .map(playerMapper::toPlayerDto).collect(Collectors.toList());
    }

    @Override
    public PlayerDto save(PlayerDto playerDto){
        Objects.requireNonNull(playerDto);
        Objects.requireNonNull(playerDto.getName());
        Objects.requireNonNull(playerDto.getTeam());

        Optional<PlayerEntity> playerEntityOptional = this.playerRepository.findByName(playerDto.getName())
                .filter(e -> Boolean.FALSE.equals(e.getId().equals(playerDto.getId())));

        if(playerEntityOptional.isPresent()){
            throw  new ResponseStatusException(
                    HttpStatus.CONFLICT, String.format("The player with that name %s already exists",playerDto.getName()));
        }
        PlayerEntity playerEntity;
        if(Objects.nonNull(playerDto.getId())){
            playerEntity = this.playerRepository.findById(playerDto.getId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            String.format("The player with that id %d not exists",playerDto.getId())));
        }
        else{
            playerEntity = new PlayerEntity();
            playerEntity.setId(this.playerRepository.getNextValId());
        }
        playerEntity.setName(playerDto.getName());
        playerEntity.setPosition(playerDto.getPosition());
        playerEntity.setTeam(teamMapper.toTeamEntity(playerDto.getTeam()));
        playerEntity.setNumberOfMatches(playerDto.getNumberOfMatches());

        playerRepository.save(playerEntity);
        return this.playerMapper.toPlayerDto(playerEntity);
    }

    @Override
    public void deleteById(Integer id){
        Objects.requireNonNull(id);
        this.playerRepository.delete(this.playerRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The player with that id %d not exists",id))));
    }

    @Override
    public PlayerDto getById(Integer id){
        Objects.requireNonNull(id);
        PlayerEntity playerEntity = this.playerRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The player with that id %d not exists",id)));
        return this.playerMapper.toPlayerDto(playerEntity);
    }
    @Override
    public List<PlayerDto> searchPlayer(String name){
        Objects.requireNonNull(name);
        List<PlayerEntity> playersEntities = this.playerRepository.findByNameContaining(name);
        return playersEntities.stream().map(playerMapper::toPlayerDto).collect(Collectors.toList());
    }
}
