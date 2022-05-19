package com.european_leagues.ws.controllers;

import com.european_leagues.openapi.api.PlayerApi;
import com.european_leagues.openapi.model.PlayerDto;
import com.european_leagues.services.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
public class PlayerController implements PlayerApi {

    @Autowired
    private IPlayerService playerService;

    @Override
    public ResponseEntity<PlayerDto> createPlayer(@Valid final PlayerDto playerDto){
        final PlayerDto response = this.playerService.save(playerDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deletePlayer(@Min(1) @Valid final Integer playerId){
        this.playerService.deleteById(playerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<PlayerDto>> getPlayers(){
        final List<PlayerDto> response = this.playerService.getPlayers();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<PlayerDto> getPlayerById(@Min(1) @Valid Integer playerId){
        final PlayerDto response = this.playerService.getById(playerId);
        return new ResponseEntity<>(response,HttpStatus.OK);

    }
    @Override
    public ResponseEntity<PlayerDto> updatePlayer(PlayerDto playerDto){
        final PlayerDto response = this.playerService.save(playerDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<List<PlayerDto>> searchPlayerByName(String playerName){
        final List<PlayerDto> response = this.playerService.searchPlayer(playerName);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
