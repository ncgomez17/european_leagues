import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

import { useParams, useNavigate } from "react-router-dom";

import incidentService from '../../../services/incidentService';
import playerService from '../../../services/playerService';

//retocar (atributos que dependen de otras tablas)
export default function DetailIncident() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyIncident= { incidentType: "", date: "", player: { id: null, name: "", numberOfMatches: "", team: {} }}
    const [incident, setIncident] = useState(emptyIncident);
    const [submitted, setSubmitted] = useState(false);
    const [players, setPlayers] = useState([]);


    useEffect(() => {
        if (!isNew) {
            incidentService.getIncident(params.id).then(res => setIncident(res.data));
        }   
        playerService.getAllPlayers().then(res => setPlayers(res.data)); 
    }, [params.id,isNew]);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _incident = { ...incident };
        _incident[`${name}`] = val;
        setIncident(_incident);
    }

    function onPlayerChange(e) {
        let _incident = { ...incident };
        _incident.player = e.value;
        setIncident(_incident);
    }

    function onInputDateChange(e, date) {
        const val = (e.target && e.target.value) || '';
        let _incident = { ...incident };
        _incident[`${date}`] = val;
        setIncident(_incident);
    }

    function onCancel(event) {
        navigate("/incidents");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (dataIncidentCorrect(incident)) {
            if (isNew) {
                incidentService.createIncident(incident);
            } else {
                incidentService.updateIncident(incident);
            }
            navigate("/incidents");
        }
    }

    function dataIncidentCorrect(c) {
        return (c.incidentType && c.player && c.date);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!isNew && <span className="text-900 text-2xl font-medium mb-4 block">Detail of Incident</span>}
                {isNew && <span className="text-900 text-2xl font-medium mb-4 block">New Incident </span>}

                <form onSubmit={handleSubmit} >
                        <div className="field grid">
                            <label htmlFor="incidentType" className='col-fixed' >IncidentType</label>
                            <div className="col">
                            <InputText id="incidentType" value={incident.incidentType} onChange={(e) => onInputChange(e, 'incidentType')} required autoFocus className={classNames({ 'p-invalid': submitted && !incident.incidentType })} />
                            {submitted && !incident.incidentType && <small className="p-error">Incident type must be indicated.</small>}
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="date" className='col-fixed'>Date</label>
                            <div className="col">
                            <Calendar id="date" required onChange={(e) => onInputDateChange(e,'date')} dateFormat="yy-mm-dd" ></Calendar>
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="player" className='col-fixed'>Player</label>
                            <div className='col'>
                            <Dropdown id="players" value={incident.player} options={players} onChange={onPlayerChange} optionLabel="name"
                                filter showClear filterBy="player.name" placeholder="Select player" />
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
