package com.european_leagues.ws.controllers;

import com.european_leagues.openapi.api.ShotApi;
import com.european_leagues.openapi.model.ShotDto;
import com.european_leagues.services.IShotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
public class ShotController implements ShotApi {

    @Autowired
    private IShotService shotService;

    @Override
    public ResponseEntity<ShotDto> createShot(@Valid final ShotDto shotDto){
        final ShotDto response = this.shotService.save(shotDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteShot(@Min(1) @Valid final Integer shotId){
        this.shotService.deleteById(shotId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<ShotDto>> getShots(){
        final List<ShotDto> response = this.shotService.getShots();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<ShotDto> getShotById(@Min(1) @Valid Integer shotId){
        final ShotDto response = this.shotService.getById(shotId);
        return new ResponseEntity<>(response,HttpStatus.OK);

    }
    @Override
    public ResponseEntity<ShotDto> updateShot(ShotDto shotDto){
        final ShotDto response = this.shotService.save(shotDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<List<ShotDto>> searchShotByPlayerName(String playerName){
        final List<ShotDto> response = this.shotService.searchShot(playerName);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
