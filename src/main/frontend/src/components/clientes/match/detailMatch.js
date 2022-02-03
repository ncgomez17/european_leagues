import React, { useState, useEffect,useCallback } from 'react';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import {  useDispatch } from 'react-redux';
import { searchMatchs} from '../../../actions/match';

import { useParams, useNavigate } from "react-router-dom";

import matchService from '../../../services/matchService';
import teamService from '../../../services/teamService';

//retocar (atributos que dependen de otras tablas)
export default function DetailMatch() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyMatch = { dateMatch: "", goalsHomeTeam: "", goalsVisitorTeam: "", homeTeam: { id: null, name: "", numberOfPlayers: "", league: "" },
    visitorTeam: { id: null, name: "", numberOfPlayers: "", league: "" }}
    const [match, setMatch] = useState(emptyMatch);
    const [submitted, setSubmitted] = useState(false);
    const [homeTeams, setHomeTeams] = useState([]);
    const [visitorTeams, setVisitorTeams] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isNew) {
            matchService.getMatch(params.id).then(res => setMatch(res.data));
        } 
        teamService.getAllTeams().then(res => {
        setHomeTeams(res.data)
        setVisitorTeams(res.data)});   
    }, [params.id,isNew]);

    const searchAllMatchs  = useCallback(() => {
        dispatch(searchMatchs());
    }, [dispatch])

    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _match = { ...match };
        _match[`${name}`] = val;
        setMatch(_match);
    }

    function onCancel(event) {
        navigate("/matchs");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (dataMatchCorrect(match)) {
            if (isNew) {
                matchService.createMatch(match).then(searchAllMatchs());
            } else {
                matchService.updateMatch(match).then(searchAllMatchs());
            }
            navigate("/matchs");
        }
    }
    function onInputDateMatchChange(e, dateMatch) {
        const val = (e.target && e.target.value) || '';
        let _match = { ...match };
        var fecha = new Date(val);
        _match[`${dateMatch}`] =new Date(fecha.setDate(fecha.getDate() + 1))
        setMatch(_match);
    }

    function onHomeTeamChange(e) {
        let _match = { ...match };
        _match.homeTeam = e.value;
        setMatch(_match);
    }

    function onVisitorTeamChange(e) {
        let _match = { ...match };
        _match.visitorTeam = e.value;
        setMatch(_match);
    }

    function dataMatchCorrect(c) {
        return (c.dateMatch && c.homeTeam && c.visitorTeam);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!isNew && <span className="text-900 text-2xl font-medium mb-4 block">Detail of Match</span>}
                {isNew && <span className="text-900 text-2xl font-medium mb-4 block">New Match</span>}

                <form onSubmit={handleSubmit} >
                <div className="field grid">
                            <label htmlFor="dateMatch" className='col-fixed'>Date Match</label>
                            <div className="col">
                            <Calendar id="dateMatch" value={new Date(match.dateMatch)} required onChange={(e) => onInputDateMatchChange(e,'dateMatch')} dateFormat="yy-mm-dd" ></Calendar>
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="goalsHomeTeam" className='col-fixed'>Goals Home Team</label>
                            <div className='col'>
                            <InputText id="goalsHomeTeam" value={match.goalsHomeTeam} onChange={(e) => onInputChange(e, 'goalsHomeTeam')} required className={classNames({ 'p-invalid': submitted && !match.goalsHomeTeam })} />
                            {submitted && !match.goalsHomeTeam && <small className="p-error"> Number Of goals home team must be indicated.</small>}
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="goalsVisitorTeam" className='col-fixed'>Goals Visitor Team</label>
                            <div className='col'>
                            <InputText id="goalsVisitorTeam" value={match.goalsVisitorTeam} onChange={(e) => onInputChange(e, 'goalsVisitorTeam')} required className={classNames({ 'p-invalid': submitted && !match.goalsVisitorTeam })} />
                            {submitted && !match.goalsVisitorTeam && <small className="p-error"> Number Of goals visitor team must be indicated.</small>}
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="homeTeam" className='col-fixed'>Home Team</label>
                            <div className='col'>
                            <Dropdown id="homeTeams" value={match.homeTeam} options={homeTeams} onChange={onHomeTeamChange} optionLabel="name"
                                filter showClear required filterBy="team.name" placeholder="Select team" />
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="visitorTeam" className='col-fixed'>Visitor Team</label>
                            <div className='col'>
                            <Dropdown id="visitorTeams" value={match.visitorTeam} options={visitorTeams} onChange={onVisitorTeamChange} optionLabel="name"
                                filter showClear  required filterBy="team.name" placeholder="Select team" />
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
