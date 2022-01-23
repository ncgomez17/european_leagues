
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { useNavigate } from 'react-router';

import incidentService from '../../../services/incidentService';

export default function IncidentList(props) {

    const [incidents, setIncidents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [incident, setIncident] = useState(null);
    const [dialog, setDialog] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        incidentService.getAllIncidents().then(res => {
            setIncidents(res.data);
            setLoading(false);
        });
    }, [dialog]);


    function newIncident() {
        navigate("new"); 
    }

    function editIncident(incident) {
        navigate(incident.id.toString()); 
    }

    function confirmDeleteIncident(incident) {
        setIncident(incident);
        setDialog(true);
    }

    function deleteIncident() {
        incidentService.deleteIncident(incident.id);
        hideDialog();
    }

    function onSearchChange(e) {
        setLoading(true);
        if(e.target.value ===""){
            incidentService.getAllIncidents().then(res => {
                setIncidents(res.data);
                setLoading(false);
            });            
        }
        else{
        incidentService.searchIncidentByPlayerName(e.target.value).then(res => {
            setIncidents(res.data);
            setLoading(false);
        });
    }

    }

    function searchAll() {
        setLoading(true);
        incidentService.getAllIncidents().then(res => {
            setIncidents(res.data);
            setLoading(false);
        });
    }

    function hideDialog() {
        setIncident(null);
        setDialog(false);
    }

    function actionsIncident(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editIncident(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteIncident(rowData)} />
            </React.Fragment>
        );
    }


    const footDialogDeleted = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog} tooltip="Delete incident" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={deleteIncident} tooltip="Edit incident"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">List of incidents</div>

            
            {loading && <div> <ProgressSpinner /> Loading... </div>}
            <div className="grid">
                <div className="col-8">
                    <div className="row">
                        <InputText id="search" placeholder='Search incidents by player name' className="col-4 mr-2" onChange={onSearchChange} />
                        <Button label="Search all Incidents" className="col-3 mt-2 mr-2" onClick={searchAll} />
                    </div>
                </div>
            </div>

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New incident" icon="pi pi-plus" className="p-button-lg" onClick={newIncident} tooltip="Create new incident" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={incidents} responsiveLayout="scroll">
                    <Column field="incidentType" header="Type"></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="player.name" header="Player"/>
                    <Column body={actionsIncident} />
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal
                footer={footDialogDeleted} onHide={hideDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {incident && <span>Confirm delete of <b>{incident.id}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}