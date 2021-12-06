package com.european_leagues.ws.controllers;

import com.european_leagues.openapi.api.TeamApi;
import com.european_leagues.openapi.model.TeamDto;
import com.european_leagues.services.ITeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
public class TeamController implements TeamApi {

    @Autowired
    private ITeamService teamService;

    @Override
    public ResponseEntity<TeamDto> createTeam(@Valid final TeamDto teamDto){
        final TeamDto response = this.teamService.save(teamDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteTeam(@Min(1) @Valid final Integer teamId){
        this.teamService.deleteById(teamId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TeamDto>> getTeams(){
        final List<TeamDto> response = this.teamService.getTeams();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<TeamDto> getTeamById(@Min(1) @Valid Integer teamId){
        final TeamDto response = this.teamService.getById(teamId);
        return new ResponseEntity<>(response,HttpStatus.OK);

    }
    @Override
    public ResponseEntity<TeamDto> updateTeam(TeamDto teamDto){
        final TeamDto response = this.teamService.save(teamDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
