
import React, { useState, useEffect,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { searchIncidents, searchIncidentByName } from '../../../actions/incident';
import * as fromState from '../../../reducers';

import { useNavigate } from 'react-router';

import incidentService from '../../../services/incidentService';

export default function IncidentList(props) {

    const [incident, setIncident] = useState(null);
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();


    const incidents = useSelector(state => fromState.getIncidents(state));
    const loading = useSelector(state => fromState.isIncidentsPending (state));
    //const error = useSelector(state => fromState.isTeamsRejected(state));

    let navigate = useNavigate();

    const searchAllIncidents = useCallback(() =>{

        dispatch(searchIncidents());
    },[dispatch]);
    const searchAllIncidentsByName = (name) =>{

        dispatch(searchIncidentByName(name));
    };

    useEffect(() => {
        searchAllIncidents();
    }, [searchAllIncidents]);


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
        searchAllIncidents();
        hideDialog();
    }

    function onSearchChange(e) {
        if(e.target.value ===""){
            searchAllIncidents();
        }
        else{
            searchAllIncidentsByName(e.target.value);

    }

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
    function dateTemplate(rowData, column) {
        return new Date(rowData['date']).toLocaleDateString();
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
                        <Button label="Search all Incidents" className="col-3 mt-2 mr-2" onClick={searchAllIncidents} />
                    </div>
                </div>
            </div>

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New incident" icon="pi pi-plus" className="p-button-lg" onClick={newIncident} tooltip="Create new incident" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={incidents} responsiveLayout="scroll">
                    <Column field="incidentType" header="Type"></Column>
                    <Column field="date" body={dateTemplate} header="Date"></Column>
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