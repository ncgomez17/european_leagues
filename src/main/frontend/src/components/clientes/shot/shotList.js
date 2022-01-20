
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router';

import shotService from '../../../services/shotService';

export default function ShotList(props) {

    const [shots, setShots] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shot, setShot] = useState(null);
    const [dialog, setDialog] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        shotService.getAllShots().then(res => {
            setShots(res.data);
            setLoading(false);
        });
    }, [dialog]);


    function newShot() {
        navigate("new"); 
    }

    function editShot(shot) {
        navigate(shot.id); 
    }

    function confirmDeleteShot(shot) {
        setShot(shot);
        setDialog(true);
    }

    function deleteShot() {
        shotService.deleteShot(shot.id);
        hideDialog();
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