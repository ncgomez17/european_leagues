
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router';

import matchService from '../../../services/matchService';

export default function MatchList(props) {

    const [matchs, setMatchs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [match, setMatch] = useState(null);
    const [dialog, setDialog] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        matchService.getAllMatchs().then(res => {
            setMatchs(res.data);
            setLoading(false);
        });
    }, [dialog]);


    function newMatch() {
        navigate("new"); 
    }

    function editMatch(match) {
        navigate(match.id);
    }

    function confirmDeleteMatch(match) {
        setMatch(match);
        setDialog(true);
    }

    function deleteMatch() {
        matchService.deleteMatch(match.id);
        hideDialog();
    }

    function hideDialog() {
        setMatch(null);
        setDialog(false);
    }

    function actionsTeam(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editMatch(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteMatch(rowData)} />
            </React.Fragment>
        );
    }


    const footDialogDeleted = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog} tooltip="Delete match" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={deleteMatch} tooltip="Edit match"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">List of matchs</div>

            
            {loading && <div> <ProgressSpinner /> Loading... </div>}

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="New match" icon="pi pi-plus" className="p-button-lg" onClick={newMatch} tooltip="Create new match" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={matchs} responsiveLayout="scroll">
                    <Column field="dateMatch" header="Date"></Column>
                    <Column field="goalsHomeTeam" header="Goals home team"></Column>
                    <Column field="goalsVisitorTeam" header="Goals visitor team"></Column>
                    <Column field="homeTeam" header="Home team" />
                    <Column field="visitorTeam" header="Visitor Team"></Column>
                    <Column body={actionsTeam} />
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Confirm" modal
                footer={footDialogDeleted} onHide={hideDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {match && <span>Confirm delete of <b>{match.dateMatch}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}