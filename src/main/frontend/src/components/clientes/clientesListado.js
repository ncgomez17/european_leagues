
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';


import { useNavigate } from 'react-router';

import clientesService from '../../services/clientesService';

export default function ClientesListado(props) {

    const [clientes, setClientes] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [clienteActual, setClienteActual] = useState(null);
    const [dialogoBorrado, setDialogoBorrado] = useState(false);

    let navigate = useNavigate();


    useEffect(() => {
        clientesService.buscarTodos().then(res => {
            setClientes(res.data);
            setCargando(false);
        });
    }, [dialogoBorrado]); // vincula la recarga a cambios en dialogoBorrado (para forzar la recarga despues de un borrado)


    function nuevoCliente() {
        navigate("nuevo"); // navega a URL para creacion de nuevo cliente
    }

    function editarCliente(cliente) {
        // setClienteActual(cliente); // no necesario
        navigate(cliente.dni); // navega a URL del cliente
    }

    function confirmarBorradoCliente(cliente) {
        setClienteActual(cliente);
        setDialogoBorrado(true);
    }

    function borrarCliente() {
        clientesService.eliminar(clienteActual.dni);
        ocultarDialogoBorrado();
    }

    function ocultarDialogoBorrado() {
        setClienteActual(null);
        setDialogoBorrado(false);
    }

    function accionesCliente(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editarCliente(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmarBorradoCliente(rowData)} />
            </React.Fragment>
        );
    }


    const pieDialogoBorrado = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorrado} tooltip="Eliminar el cliente" />
            <Button label="si" icon="pi pi-check" className="p-button-text" onClick={borrarCliente} tooltip="Ver/editar el cliente"/>
        </React.Fragment>
    );
    return (
        <div>
            <div className="text-3xl text-800 font-bold mb-4">Listado de clientes</div>

            
            {cargando && <div> <ProgressSpinner /> Cargando... </div>}

            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button label="Nuevo cliente" icon="pi pi-plus" className="p-button-lg" onClick={nuevoCliente} tooltip="Crear un nuevo cliente" tooltipOptions={{position: 'bottom'}} />
            </div>

            <div className="surface-card p-4 border-round shadow-2">
                <DataTable value={clientes} responsiveLayout="scroll">
                    <Column field="dni" header="DNI"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="direccion.localidad" header="Localidad" sortable />
                    <Column field="direccion.codigoPostal" header="Código Postal" />
                    <Column field="direccion.provincia" header="Provincia" sortable />
                    <Column field="direccion.telefono" header="Teléfono" />
                    <Column body={accionesCliente} />
                </DataTable>
            </div>

            <Dialog visible={dialogoBorrado} style={{ width: '450px' }} header="Confirm" modal
                footer={pieDialogoBorrado} onHide={ocultarDialogoBorrado}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {clienteActual && <span>Confirmar el borrado de <b>{clienteActual.nombre}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}