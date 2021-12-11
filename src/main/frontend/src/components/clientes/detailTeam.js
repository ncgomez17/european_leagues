import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import teamService from '../../services/teamService';

export default function DetailTeam() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyTeam = { name: "", numberOfPlayers: "", league: ""}
    const [team, setTeam] = useState(emptyTeam);
    const [submitted, setSubmitted] = useState(false);


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
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="name" >Name</label>
                            <InputText id="name" value={team.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !team.name })} />
                            {submitted && !team.name && <small className="p-error">A name must be indicated.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="numberOfPlayers">NumberOfPlayers</label>
                            <InputText id="numberOfPlayers" value={team.numberOfPlayers} onChange={(e) => onInputChange(e, 'numberOfPlayers')} required className={classNames({ 'p-invalid': submitted && !team.numberOfPlayers })} />
                            {submitted && !team.numberOfPlayers && <small className="p-error"> Number of players must be indicated.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="league">League</label>
                            <InputText id="league" value={team.league} onChange={(e) => onInputChange(e, 'league')} />
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
