
import React, { useState, useEffect,useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { searchTeams, searchTeamsByName} from '../../../actions/team';
import * as fromState from '../../../reducers';

import { useNavigate } from 'react-router';

import teamService from '../../../services/teamService';

export default function TeamList(props) {

    const [team, setTeam] = useState(null);
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();

    const teams = useSelector(state => fromState.getTeams(state));
    const loading = useSelector(state => fromState.isTeamsPending (state));
    //const error = useSelector(state => fromState.isTeamsRejected(state));

    let navigate = useNavigate();
    const searchAllTeams  = useCallback(() => {
        dispatch(searchTeams());
    }, [dispatch])

    const searchAllTeamsByName = (name) =>{

        dispatch(searchTeamsByName(name));
    };
    useEffect(() =>{
        searchAllTeams();
        
    },[searchAllTeams]);


    function newTeam() {
        navigate("new"); 
    }

    function editTeam(team) {
        navigate(team.id.toString()); 
    }

    function confirmDeleteTeam(team) {
        setTeam(team);
        setDialog(true);
    }

    function deleteTeam() {
        teamService.deleteTeam(team.id);
        searchAllTeams()
        hideDialog();
    }
    
    function onSearchChange(e) {
        if(e.target.value ===""){
            searchAllTeams();           
        }
        else{
        searchAllTeamsByName(e.target.value);
    }

    }

    function hideDialog() {
        setTeam(null);
        setDialog(false);
    }

    function actionsTeam(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editTeam(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteTeam(rowData)} />
            </React.Fragment>
        );
    }


    const footDialogDeleted = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog} tooltip="Delete team" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={deleteTeam} tooltip="Edit team"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">List of teams</div>

            
            {loading && <div> <ProgressSpinner /> Loading... </div>}
            <div className="grid">
                <div className="col-8">
                    <div className="row">
                        <InputText id="search" placeholder='Search teams by name' className="col-4 mr-2" onChange={onSearchChange} />
                        <Button label="Search all Teams" className="col-3 mt-2 mr-2" onClick={searchAllTeams} />
                    </div>
                </div>
            </div>

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New team" icon="pi pi-plus" className="p-button-lg" onClick={newTeam} tooltip="Create new team" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={teams} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="numberOfPlayers" header="Number Of players"></Column>
                    <Column field="league" header="League" />
                    <Column body={actionsTeam} />
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal
                footer={footDialogDeleted} onHide={hideDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {team && <span>Confirm delete of <b>{team.name}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}