import React, { useState, useEffect,useCallback } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { useParams, useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { searchShots} from '../../../actions/shot';
import shotService from '../../../services/shotService';
import playerService from '../../../services/playerService';

//retocar (atributos que dependen de otras tablas)
export default function DetailShot() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyShot = { minute: "", result: "", site: "", player: { id: null, name: "", numberOfMatches: "", team: {} }}
    const [shot, setShot] = useState(emptyShot);
    const [submitted, setSubmitted] = useState(false);
    const [players, setPlayers] = useState([]);
    const site =["VISITOR","HOME"]
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isNew) {
            shotService.getShot(params.id).then(res => setShot(res.data));
        }   
        playerService.getAllPlayers().then(res => setPlayers(res.data)); 
    }, [params.id,isNew]);

    const searchAllShots  = useCallback(() => {
        dispatch(searchShots());
    }, [dispatch])

    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _shot = { ...shot };
        _shot[`${name}`] = val;
        setShot(_shot);
    }
    function onInputChangeMinute(e, name) {
        const val = (e && e.value) || '';
        let _shot = { ...shot };
        _shot[`${name}`] = val;
        setShot(_shot);
    }
    function onPlayerChange(e) {
        let _shot = { ...shot };
        _shot.player = e.value;
        setShot(_shot);
    }

    function onSiteChange(e) {
        let _shot = { ...shot };
        _shot.site = e.value;
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
                shotService.createShot(shot).then(searchAllShots());
            } else {
                shotService.updateShot(shot).then(searchAllShots());
            }
            navigate("/shots");
        }
    }

    function dataShotCorrect(c) {
        return (c.minute && c.result);
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
                            <InputNumber id="minute" value={shot.minute} onChange={(e) => onInputChangeMinute(e, 'minute')} required autoFocus className={classNames({ 'p-invalid': submitted && !shot.minute })} />
                            {submitted && !shot.minute && <small className="p-error">Minute must be indicated.</small>}
                            </div>
                    </div>

                        <div className="field grid">
                            <label htmlFor="result" className='col-fixed'>Result</label>
                            <div className='col'>
                            <InputText id="result" value={shot.result} onChange={(e) => onInputChange(e, 'result')} required className={classNames({ 'p-invalid': submitted && !shot.result })} />
                            {submitted && !shot.result && <small className="p-error"> Result must be indicated.</small>}
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="site"className='col-fixed'>Site</label>
                            <div className='col'>
                            <Dropdown id="site"value={shot.site} options={site} onChange={onSiteChange}
                                filter showClear required filterBy="site" placeholder="Select site" />
                            </div>
                        </div>

                        <div className="field grid">
                            <label htmlFor="players" className='col-fixed'>Player</label>
                            <div className='col'>
                            <Dropdown id="players" value={shot.player} options={players} onChange={onPlayerChange} optionLabel="name"
                                filter showClear required filterBy="player.name" placeholder="Select player" />
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
