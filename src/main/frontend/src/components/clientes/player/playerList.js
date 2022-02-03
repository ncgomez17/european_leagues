
import React, { useState, useEffect,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { searchPlayers, searchPlayerByName} from '../../../actions/player';
import * as fromState from '../../../reducers';

import { useNavigate } from 'react-router';

import playerService from '../../../services/playerService';

export default function PlayerList(props) {

    const [player, setPlayer] = useState(null);
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();
    const players = useSelector(state => fromState.getPlayers(state));
    const loading = useSelector(state => fromState.isPlayersPending (state));
    //const error = useSelector(state => fromState.isTeamsRejected(state));

    let navigate = useNavigate();

    const searchAllPlayers = useCallback(() =>{

        dispatch(searchPlayers());
    },[dispatch]);
    const searchAllPlayersByName = (name) =>{

        dispatch(searchPlayerByName(name));
    };

    useEffect(() => {
        searchAllPlayers();
    }, [searchAllPlayers]);


    function newPlayer() {
        navigate("new"); 
    }

    function editPlayer(player) {
        navigate(player.id.toString()); 
    }

    function confirmDeletePlayer(player) {
        setPlayer(player);
        setDialog(true);
    }

    function deletePlayer() {
        playerService.deletePlayer(player.id);
        searchAllPlayers();
        hideDialog();
    }

    function onSearchChange(e) {
        if(e.target.value ===""){
            searchAllPlayers();
            }          
        else{
            searchAllPlayersByName(e.target.value);
        };
    }


    function hideDialog() {
        setPlayer(null);
        setDialog(false);
    }

    function actionsPlayer(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPlayer(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeletePlayer(rowData)} />
            </React.Fragment>
        );
    }


    const footDialogDeleted = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog} tooltip="Delete player" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={deletePlayer} tooltip="Edit player"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">List of players</div>

            
            {loading && <div> <ProgressSpinner /> Loading... </div>}
            <div className="grid">
                <div className="col-8">
                    <div className="row">
                        <InputText id="search" placeholder='Search players by name' className="col-4 mr-2" onChange={onSearchChange} />
                        <Button label="Search all Players" className="col-3 mt-2 mr-2" onClick={searchAllPlayers} />
                    </div>
                </div>
            </div>

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New player" icon="pi pi-plus" className="p-button-lg" onClick={newPlayer} tooltip="Create new player" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={players} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="numberOfMatches" header="Number of matches"></Column>
                    <Column field="position" header="Position"/>
                    <Column field="team.name" header="Team"/>
                    <Column body={actionsPlayer} />
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal
                footer={footDialogDeleted} onHide={hideDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {player && <span>Confirm delete of <b>{player.name}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}