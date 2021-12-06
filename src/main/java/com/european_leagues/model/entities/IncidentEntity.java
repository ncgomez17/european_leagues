package com.european_leagues.model.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="INCIDENT")
@Data
public class IncidentEntity implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="incident_id")
    Integer id;

    @Column(name="incident_type")
    String incidentType;

    @Column(name="date")
    @Temporal(TemporalType.TIMESTAMP)
    Date date;

    @ManyToOne
    @JoinColumn(name = "FK_MATCH", nullable = false)
    MatchEntity match;

    @ManyToOne
    @JoinColumn(name = "FK_PLAYER", nullable = false)
    PlayerEntity player;
}
