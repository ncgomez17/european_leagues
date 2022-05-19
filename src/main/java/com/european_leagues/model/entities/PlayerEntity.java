package com.european_leagues.model.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="PLAYER")
@Data
public class PlayerEntity implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="player_id")
    Integer id;

    @Column(name="name")
    String name;

    @Column(name="number_of_matches")
    Integer numberOfMatches;

    @Column(name="position")
    String position;

    @ManyToOne
    @JoinColumn(name = "FK_TEAM", nullable = false)
    TeamEntity team;

    @OneToMany(mappedBy = "player",cascade = CascadeType.ALL,orphanRemoval = true)
    List<ShotEntity> shot;

    @OneToMany(mappedBy = "player",cascade = CascadeType.ALL,orphanRemoval = true)
    List<IncidentEntity> incident;

}
