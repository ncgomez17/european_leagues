
import React, { useState, useEffect,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { searchShots, searchShotByName } from '../../../actions/shot';
import * as fromState from '../../../reducers';

import { useNavigate } from 'react-router';

import shotService from '../../../services/shotService';

export default function ShotList(props) {

    const [shot, setShot] = useState(null);
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();

    const shots = useSelector(state => fromState.getShots(state));
    const loading = useSelector(state => fromState.isShotsPending (state));
    //const error = useSelector(state => fromState.isTeamsRejected(state));

    let navigate = useNavigate();

    const searchAllShots =useCallback( () =>{

        dispatch(searchShots());
    },[dispatch]);
    const searchAllShotsByName = (name) =>{

        dispatch(searchShotByName(name));
    };

    useEffect(() => {
        searchAllShots();
    }, [searchAllShots]);


    function newShot() {
        navigate("new"); 
    }

    function editShot(shot) {
        navigate(shot.id.toString()); 
    }

    function confirmDeleteShot(shot) {
        setShot(shot);
        setDialog(true);
    }

    function deleteShot() {
        shotService.deleteShot(shot.id);
        searchAllShots()
        hideDialog();
    }

    function onSearchChange(e) {
        if(e.target.value ===""){
            searchAllShots(); 
            }            
        else{
            searchAllShotsByName(e.target.value);
        };
    }

    function hideDialog() {
        setShot(null);
        setDialog(false);
    }

    function actionsShot(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editShot(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteShot(rowData)} />
            </React.Fragment>
        );
    }


    const footDialogDeleted = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog} tooltip="Delete shot" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={deleteShot} tooltip="Edit shot"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">List of shots</div>

            
            {loading && <div> <ProgressSpinner /> Loading... </div>}

            <div className="grid">
                <div className="col-8">
                    <div className="row">
                        <InputText id="search" placeholder='Search shots by player name' className="col-4 mr-2" onChange={onSearchChange} />
                        <Button label="Search all Shots" className="col-3 mt-2 mr-2" onClick={searchAllShots} />
                    </div>
                </div>
            </div>

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New shot" icon="pi pi-plus" className="p-button-lg" onClick={newShot} tooltip="Create new shot" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={shots} responsiveLayout="scroll">
                    <Column field="minute" header="Minute"></Column>
                    <Column field="result" header="Result"></Column>
                    <Column field="site" header="Site"/>
                    <Column field="player.name" header="Player"/>
                    <Column field="playerAssisted.name" header="Player who assisted"/>
                    <Column body={actionsShot} />
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal
                footer={footDialogDeleted} onHide={hideDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {shot && <span>Confirm delete of <b>{shot.id}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}