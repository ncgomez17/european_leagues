package com.european_leagues.model.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

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
    LocalDate date;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "FK_PLAYER", nullable = false)
    PlayerEntity player;
}
