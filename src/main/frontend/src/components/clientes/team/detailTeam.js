import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

import { useParams, useNavigate } from "react-router-dom";

import teamService from '../../../services/teamService';

export default function DetailTeam() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyTeam = { name: "", numberOfPlayers: "", league: ""}
    const [team, setTeam] = useState(emptyTeam);
    const [submitted, setSubmitted] = useState(false);
    const nameLeagues =["Premier League","LaLiga","Serie A","Bundesliga","Ligue 1","Primera División Portuguesa"]


    useEffect(() => {
        if (!isNew) {
            teamService.getTeam(params.id).then(res => setTeam(res.data));
        }   
    }, [params.id,isNew]);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _team = { ...team };
        _team[`${name}`] = val;
        setTeam(_team);
    }

    function onLeagueChange(e) {
        let _team = { ...team };
        _team.league = e.value;
        setTeam(_team);
    }

    function onCancel(event) {
        navigate("/teams");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (dataTeamCorrect(team)) {
            if (isNew) {
                teamService.createTeam(team);
            } else {
                teamService.updateTeam(team);
            }
            navigate("/teams");
        }
    }

    function dataTeamCorrect(c) {
        return (c.name && c.league);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!isNew && <span className="text-900 text-2xl font-medium mb-4 block">Detail of Team</span>}
                {isNew && <span className="text-900 text-2xl font-medium mb-4 block">New Team</span>}

                <form onSubmit={handleSubmit} >
                    <div className="field grid">
                            <label htmlFor="name" className='col-fixed' >Name</label>
                            <div className="col">
                            <InputText id="name" value={team.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !team.name })} />
                            {submitted && !team.name && <small className="p-error">A name must be indicated.</small>}
                        </div>
                    </div>
                        <div className="field grid">
                            <label htmlFor="numberOfPlayers" className='col-fixed'>NumberOfPlayers</label>
                            <div className="col">
                            <InputText id="numberOfPlayers" value={team.numberOfPlayers} onChange={(e) => onInputChange(e, 'numberOfPlayers')} required className={classNames({ 'p-invalid': submitted && !team.numberOfPlayers })} />
                            {submitted && !team.numberOfPlayers && <small className="p-error"> Number of players must be indicated.</small>}
                            </div>
                    </div>
                        <div className="field grid">
                            <label htmlFor="leagues"className='col-fixed'>League</label>
                            <div className='col'>
                            <Dropdown id="leagues"value={team.league} options={nameLeagues} onChange={onLeagueChange}
                                filter showClear filterBy="league" placeholder="Select league" />
                            </div>
                        </div>

                    <Divider />

                    <div className="p-p-3">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined mr-2" onClick={onCancel} />
                        <Button label="Save" icon="pi pi-check" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}
