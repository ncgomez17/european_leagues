package com.european_leagues.ws.controllers;

import com.european_leagues.openapi.api.IncidentApi;
import com.european_leagues.openapi.model.IncidentDto;
import com.european_leagues.services.IIncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.List;

@RestController
public class IncidentController implements IncidentApi {

    @Autowired
    private IIncidentService incidentService;

    @Override
    public ResponseEntity<IncidentDto> createIncident(@Valid final IncidentDto incidentDto){
        final IncidentDto response = this.incidentService.save(incidentDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteIncident(@Min(1) @Valid final Integer incidentId){
        this.incidentService.deleteById(incidentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<IncidentDto>> getIncidents(){
        final List<IncidentDto> response = this.incidentService.getIncidents();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @Override
    public ResponseEntity<IncidentDto> getIncidentById(@Min(1) @Valid Integer incidentId){
        final IncidentDto response = this.incidentService.getById(incidentId);
        return new ResponseEntity<>(response,HttpStatus.OK);

    }
    @Override
    public ResponseEntity<IncidentDto> updateIncident(IncidentDto incidentDto){
        final IncidentDto response = this.incidentService.save(incidentDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
