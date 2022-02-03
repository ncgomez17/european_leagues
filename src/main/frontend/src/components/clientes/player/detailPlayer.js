import React, { useState, useEffect,useCallback } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import {  useDispatch } from 'react-redux';
import { searchPlayers} from '../../../actions/player';
import { useParams, useNavigate } from "react-router-dom";

import playerService from '../../../services/playerService';
import teamService from '../../../services/teamService';

//retocar (atributos que dependen de otras tablas)
export default function DetailPlayer() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyPlayer = { name: "", numberOfMatches: "", position: "", team: { id: null, name: "", numberOfPlayers: "", league: "" }, descripcion: "" }
    const [player, setPlayer] = useState(emptyPlayer);
    const [submitted, setSubmitted] = useState(false);
    const [teams, setTeams] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isNew) {
            playerService.getPlayer(params.id).then(res => setPlayer(res.data));
        }
        teamService.getAllTeams().then(res => setTeams(res.data)); 
    }, [params.id,isNew]);

    const searchAllPlayers  = useCallback(() => {
        dispatch(searchPlayers());
    }, [dispatch])

    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _player = { ...player };
        _player[`${name}`] = val;
        setPlayer(_player);
    }
    function onTeamChange(e) {
        let _player = { ...player };
        _player.team = e.value;
        setPlayer(_player);
    }

    function onCancel(event) {
        navigate("/players");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (dataPlayerCorrect(player)) {
            if (isNew) {
                playerService.createPlayer(player).then(searchAllPlayers());
            } else {
                playerService.updatePlayer(player).then(searchAllPlayers());
            }
            navigate("/players");
        }
    }

    function dataPlayerCorrect(c) {
        return (c.name && c.position);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!isNew && <span className="text-900 text-2xl font-medium mb-4 block">Detail of Player</span>}
                {isNew && <span className="text-900 text-2xl font-medium mb-4 block">New Player</span>}

                <form onSubmit={handleSubmit} >
                        <div className="field grid">
                            <label htmlFor="name" className='col-fixed' >name</label>
                            <div className='col'>
                            <InputText id="name" value={player.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !player.name })} />
                            {submitted && !player.name && <small className="p-error">Name must be indicated.</small>}
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="numberOfMatches" className='col-fixed'>Number of matches</label>
                            <div className='col'>
                            <InputText id="numberOfMatches" value={player.numberOfMatches} onChange={(e) => onInputChange(e, 'numberOfMatches')} required className={classNames({ 'p-invalid': submitted && !player.numberOfMatches })} />
                            </div>
                            {submitted && !player.numberOfMatches && <small className="p-error"> Number Of matches must be indicated.</small>}
                        </div>

                        <div className="field grid">
                            <label htmlFor="position" className='col-fixed'>Position</label>
                            <div className='col'>
                            <InputText id="position" required value={player.position} onChange={(e) => onInputChange(e, 'position')} />
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="teams" className='col-fixed'>Team</label>
                            <div className='col'>
                            <Dropdown id="teams" value={player.team} options={teams} onChange={onTeamChange} optionLabel="name"
                                filter showClear required filterBy="team.name" placeholder="Select team" />
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
