import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import matchService from '../../../services/matchService';

//retocar (atributos que dependen de otras tablas)
export default function DetailMatch() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyMatch = { dateMatch: "", goalsHomeTeam: "", goalsVisitorTeam: "", homeTeam:"", visitorTeam:""}
    const [match, setMatch] = useState(emptyMatch);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!isNew) {
            matchService.getMatch(params.id).then(res => setMatch(res.data));
        }   
    }, [params.id,isNew]);


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
                matchService.createMatch(match);
            } else {
                matchService.updateMatch(match);
            }
            navigate("/matchs");
        }
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
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="dateMatch" >Date of match</label>
                            <InputNumber id="dateMatch" value={match.dateMatch} onChange={(e) => onInputChange(e, 'dateMatch')} required autoFocus className={classNames({ 'p-invalid': submitted && !match.dateMatch })} />
                            {submitted && !match.dateMatch && <small className="p-error">Date must be indicated.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="goalsHomeTeam">Goals Home Team</label>
                            <InputText id="goalsHomeTeam" value={match.goalsHomeTeam} onChange={(e) => onInputChange(e, 'goalsHomeTeam')} required className={classNames({ 'p-invalid': submitted && !match.goalsHomeTeam })} />
                            {submitted && !match.goalsHomeTeam && <small className="p-error"> Number Of goals home team must be indicated.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="goalsVisitorTeam">Goals Visitor Team</label>
                            <InputText id="goalsVisitorTeam" value={match.goalsVisitorTeam} onChange={(e) => onInputChange(e, 'goalsVisitorTeam')} required className={classNames({ 'p-invalid': submitted && !match.goalsVisitorTeam })} />
                            {submitted && !match.goalsVisitorTeam && <small className="p-error"> Number Of goals visitor team must be indicated.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="homeTeam">Home Team</label>
                            <InputText id="homeTeam" value={match.homeTeam} onChange={(e) => onInputChange(e, 'homeTeam')} required className={classNames({ 'p-invalid': submitted && !match.homeTeam })} />
                            {submitted && !match.homeTeam && <small className="p-error"> Home team must be indicated.</small>}
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
