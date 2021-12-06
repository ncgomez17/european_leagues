package com.european_leagues.ws.controllers;

import com.european_leagues.openapi.api.MatchApi;
import com.european_leagues.openapi.model.MatchDto;
import com.european_leagues.services.IMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
public class MatchController implements MatchApi {

    @Autowired
    private IMatchService matchService;

    @Override
    public ResponseEntity<MatchDto> createMatch(@Valid final MatchDto matchDto){
        final MatchDto response = this.matchService.save(matchDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteMatch(@Min(1) @Valid final Integer matchId){
        this.matchService.deleteById(matchId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MatchDto>> getMatchs(){
        final List<MatchDto> response = this.matchService.getMatchs();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<MatchDto> getMatchById(@Min(1) @Valid Integer matchId){
        final MatchDto response = this.matchService.getById(matchId);
        return new ResponseEntity<>(response,HttpStatus.OK);

    }
    @Override
    public ResponseEntity<MatchDto> updateMatch(MatchDto matchDto){
        final MatchDto response = this.matchService.save(matchDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
