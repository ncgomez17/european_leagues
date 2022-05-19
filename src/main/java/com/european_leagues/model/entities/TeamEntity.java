package com.european_leagues.model.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="TEAM")
@Data
public class TeamEntity implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="team_id")
    Integer id;

    @Column(name="name")
    String name;

    @Column(name="number_of_players")
    Integer numberOfPlayers;

    @Column(name="league")
    String league;

    @OneToMany(mappedBy = "team",cascade = CascadeType.ALL, orphanRemoval = true)
    List<PlayerEntity> player;

    @OneToMany(mappedBy = "visitorTeam",cascade = CascadeType.ALL, orphanRemoval = true)
    List<MatchEntity> visitorTeam;

    @OneToMany(mappedBy = "homeTeam",cascade = CascadeType.ALL, orphanRemoval = true)
    List<MatchEntity> homeTeam;


}
