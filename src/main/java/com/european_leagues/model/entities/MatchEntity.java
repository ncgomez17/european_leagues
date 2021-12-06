package com.european_leagues.model.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="MATCH_LEAGUE")
@Data
public class MatchEntity implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="match_id")
    Integer id;

    @Column(name="date_match")
    @Temporal(TemporalType.TIMESTAMP)
    Date dateMatch;

    @Column(name="goals_home_team")
    Integer goalsHomeTeam;

    @Column(name="goals_visitor_team")
    Integer goalsVisitorTeam;

    @ManyToOne
    TeamEntity homeTeam;

    @ManyToOne
    TeamEntity visitorTeam;


}
