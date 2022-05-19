package com.european_leagues.model.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name="MATCH_LEAGUE")
@Data
public class MatchEntity implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="match_id")
    Integer id;

    @Column(name="date_match")
    LocalDate dateMatch;

    @Column(name="goals_home_team")
    Integer goalsHomeTeam;

    @Column(name="goals_visitor_team")
    Integer goalsVisitorTeam;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    TeamEntity homeTeam;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    TeamEntity visitorTeam;


}
