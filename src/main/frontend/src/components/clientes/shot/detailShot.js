import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import shotService from '../../../services/shotService';

//retocar (atributos que dependen de otras tablas)
export default function DetailShot() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyShot = { minute: "", result: "", site: "", player:""}
    const [shot, setShot] = useState(emptyShot);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!isNew) {
            shotService.getShot(params.id).then(res => setShot(res.data));
        }   
    }, [params.id,isNew]);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _shot = { ...shot };
        _shot[`${name}`] = val;
        setShot(_shot);
    }

    function onCancel(event) {
        navigate("/shots");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (dataShotCorrect(shot)) {
            if (isNew) {
                shotService.createShot(shot);
            } else {
                shotService.updateShot(shot);
            }
            navigate("/shots");
        }
    }

    function dataShotCorrect(c) {
        return (c.name && c.result);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!isNew && <span className="text-900 text-2xl font-medium mb-4 block">Detail of Shot</span>}
                {isNew && <span className="text-900 text-2xl font-medium mb-4 block">New Shot</span>}

                <form onSubmit={handleSubmit} >
                    <div className="field grid" >
                            <label htmlFor="minute" className='col-fixed' >minute</label>
                            <div className="col">
                            <InputNumber id="minute" value={shot.minute} onChange={(e) => onInputChange(e, 'minute')} required autoFocus className={classNames({ 'p-invalid': submitted && !shot.minute })} />
                            {submitted && !shot.minute && <small className="p-error">Minute must be indicated.</small>}
                            </div>

                        <div className="field grid">
                            <label htmlFor="result" className='col-fixed'>Result</label>
                            <div className='col'>
                            <InputText id="result" value={shot.result} onChange={(e) => onInputChange(e, 'result')} required className={classNames({ 'p-invalid': submitted && !shot.result })} />
                            {submitted && !shot.result && <small className="p-error"> Result must be indicated.</small>}
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="league" className='col-fixed'>Site</label>
                            <div className='col'>
                            <InputText id="league" value={shot.site} onChange={(e) => onInputChange(e, 'site')} />
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="player" className='col-fixed'>Player</label>
                            <div className='col'>
                            <InputText id="player" value={shot.player} onChange={(e) => onInputChange(e, 'player')} />
                            </div>
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
