package com.european_leagues.model.entities;

import com.european_leagues.utils.enums.Site;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="SHOT")
@Data
public class ShotEntity implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="shot_id")
    Integer id;

    @Column(name="minute")
    Integer minute;

    @Column(name="result")
    String result;

    @Column(name="site")
    @Enumerated(EnumType.STRING)
    Site site;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "FK_PLAYER", nullable = false)
    PlayerEntity player;


}
