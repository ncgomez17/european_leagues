package com.european_leagues.services.impl;

import com.european_leagues.mappers.IncidentMapper;
import com.european_leagues.mappers.MatchMapper;
import com.european_leagues.mappers.PlayerMapper;
import com.european_leagues.model.entities.IncidentEntity;
import com.european_leagues.model.repositories.IIncidentRepository;
import com.european_leagues.openapi.model.IncidentDto;
import com.european_leagues.services.IIncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class IncidentServiceImpl implements IIncidentService {

    @Autowired
    private IIncidentRepository incidentRepository;

    @Autowired
    private IncidentMapper incidentMapper;

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private MatchMapper matchMapper;

    @Override
    public List<IncidentDto> getIncidents(){
        return incidentRepository.findAll().stream()
                .map(incidentMapper::toIncidentDto).collect(Collectors.toList());
    }

    @Override
    public IncidentDto save(IncidentDto incidentDto) throws ParseException {
        Objects.requireNonNull(incidentDto);
        Objects.requireNonNull(incidentDto.getIncidentType());
        System.out.println(incidentDto);
        IncidentEntity incidentEntity;
        if(Objects.nonNull(incidentDto.getId())){
            incidentEntity = this.incidentRepository.findById(incidentDto.getId())
                    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            String.format("The incident with that id %d not exists",incidentDto.getId())));
        }
        else{
            incidentEntity = new IncidentEntity();
            incidentEntity.setId(this.incidentRepository.getNextValId());
        }
        incidentEntity.setIncidentType(incidentDto.getIncidentType());
        incidentEntity.setDate(incidentDto.getDate());
        incidentEntity.setPlayer(playerMapper.toPlayerEntity(incidentDto.getPlayer()));
        System.out.println(incidentEntity);
        incidentRepository.save(incidentEntity);
        return this.incidentMapper.toIncidentDto(incidentEntity);
    }

    @Override
    public void deleteById(Integer id){
        Objects.requireNonNull(id);

        this.incidentRepository.delete(this.incidentRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The incident with that id %d not exists",id))));
    }
    @Override
    public IncidentDto getById(Integer id){
        Objects.requireNonNull(id);
        IncidentEntity incidentEntity = this.incidentRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        String.format("The incident with that id %d not exists",id)));
        return this.incidentMapper.toIncidentDto(incidentEntity);
    }
    @Override
    public List<IncidentDto> searchIncident(String playerName){
        Objects.requireNonNull(playerName);
        List<IncidentEntity> incidentsEntities = this.incidentRepository.findByPlayerNameContaining(playerName);
        return incidentsEntities.stream().map(incidentMapper::toIncidentDto).collect(Collectors.toList());
    }


}
