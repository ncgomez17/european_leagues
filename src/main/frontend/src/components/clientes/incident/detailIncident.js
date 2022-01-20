import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import incidentService from '../../../services/incidentService';

//retocar (atributos que dependen de otras tablas)
export default function DetailIncident() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyIncident= { incidentType: "", date: "", match: "", player:""}
    const [incident, setIncident] = useState(emptyIncident);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!isNew) {
            incidentService.getIncident(params.id).then(res => setIncident(res.data));
        }   
    }, [params.id,isNew]);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _incident = { ...incident };
        _incident[`${name}`] = val;
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
                            <label htmlFor="incidentType" className='col-fixed' >Date of incident</label>
                            <div className="col">
                            <InputNumber id="incidentType" value={incident.incidentType} onChange={(e) => onInputChange(e, 'incidentType')} required autoFocus className={classNames({ 'p-invalid': submitted && !incident.incidentType })} />
                            {submitted && !incident.incidentType && <small className="p-error">Incident type must be indicated.</small>}
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="date" className='col-fixed'>Date</label>
                            <div className="col">
                            <InputText id="date" value={incident.date} onChange={(e) => onInputChange(e, 'date')} required className={classNames({ 'p-invalid': submitted && !incident.date })} />
                            {submitted && !incident.date && <small className="p-error"> Date must be indicated.</small>}
                            </div>
                        </div>
                        <div className="field grid">
                            <label htmlFor="match" className='col-fixed'>Match</label>
                            <div className="col">
                            <InputText id="match" value={incident.match} onChange={(e) => onInputChange(e, 'match')} required className={classNames({ 'p-invalid': submitted && !incident.match })} />
                            {submitted && !incident.match && <small className="p-error"> Match must be indicated.</small>}
                            </div>
                        </div>
                        <div className="p-field">
                            <label htmlFor="player" className='col-fixed'>Player</label>
                            <div className="col">
                            <InputText id="player" value={incident.player} onChange={(e) => onInputChange(e, 'player')} required className={classNames({ 'p-invalid': submitted && !incident.player })} />
                            {submitted && !incident.player&& <small className="p-error"> Player be indicated.</small>}
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
