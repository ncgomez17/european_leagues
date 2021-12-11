import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import playerService from '../../services/playerService';

//retocar (atributos que dependen de otras tablas)
export default function DetailPlayer() {

    const params = useParams();
    const navigate = useNavigate();
    const isNew = !('id' in params);

    const emptyPlayer = { name: "", numberOfMatches: "", position: "", team:""}
    const [player, setPlayer] = useState(emptyPlayer);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!isNew) {
            playerService.getPlayer(params.id).then(res => setPlayer(res.data));
        }   
    }, [params.id,isNew]);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _player = { ...player };
        _player[`${name}`] = val;
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
                playerService.createPlayer(player);
            } else {
                playerService.updatePlayer(player);
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
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="name" >name</label>
                            <InputNumber id="name" value={player.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !player.name })} />
                            {submitted && !player.name && <small className="p-error">Name must be indicated.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="numberOfMatches">Number of matches</label>
                            <InputText id="numberOfMatches" value={player.numberOfMatches} onChange={(e) => onInputChange(e, 'numberOfMatches')} required className={classNames({ 'p-invalid': submitted && !player.numberOfMatches })} />
                            {submitted && !player.numberOfMatches && <small className="p-error"> Number Of matches must be indicated.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="position">Position</label>
                            <InputText id="position" value={player.position} onChange={(e) => onInputChange(e, 'position')} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="team">Team</label>
                            <InputText id="team" value={player.team.name} onChange={(e) => onInputChange(e, 'team')} />
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
