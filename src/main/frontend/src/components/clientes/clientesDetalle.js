import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useParams, useNavigate } from "react-router-dom";

import clientesService from '../../services/clientesService';

export default function ClientesDetalle() {

    const params = useParams();
    const navigate = useNavigate();
    const esNuevo = !('dniCliente' in params);

    const clienteVacio = { nombre: "", direccion: { domicilio: "", localidad: "", codigoPostal: "", provincia: "", telefono: "" } }
    const [cliente, setCliente] = useState(clienteVacio);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (!esNuevo) {
            clientesService.buscarPorDNI(params.dniCliente).then(res => setCliente(res.data));
        }
    }, []);


    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _cliente = { ...cliente };
        if (name.startsWith('direccion')) {
            const campoDireccion = name.split('.')[1];
            _cliente.direccion[`${campoDireccion}`] = val;

        } else {
            _cliente[`${name}`] = val;
        }
        setCliente(_cliente);
    }

    function onCancelar(event) {
        navigate("/clientes");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        if (datosClienteCorrectos(cliente)) {
            if (esNuevo) {
                clientesService.crear(cliente);
            } else {
                clientesService.modificar(cliente.dni, cliente);
            }
            navigate("/clientes");
        }
    }

    function datosClienteCorrectos(c) {
        return (c.dni && c.nombre);
    }

    return (
        <div>
            <div className="surface-card border-round shadow-2 p-4">
                {!esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Detalle de cliente</span>}
                {esNuevo && <span className="text-900 text-2xl font-medium mb-4 block">Nuevo cliente</span>}

                <form onSubmit={handleSubmit} >
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="dni" >DNI</label>
                            <InputText id="dni" value={cliente.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && !cliente.dni })} />
                            {submitted && !cliente.dni && <small className="p-error">Debe indicarse un DNI.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={cliente.nombre} onChange={(e) => onInputChange(e, 'nombre')} required className={classNames({ 'p-invalid': submitted && !cliente.nombre })} />
                            {submitted && !cliente.nombre && <small className="p-error">Debe indicarse un nombre.</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="domicilio">Domicilio</label>
                            <InputText id="domicilio" value={cliente.direccion.domicilio} onChange={(e) => onInputChange(e, 'direccion.domicilio')} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="localidad">Localidad</label>
                            <InputText id="localidad" value={cliente.direccion.localidad} onChange={(e) => onInputChange(e, 'direccion.localidad')} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="codigoPostal">Código postal</label>
                            <InputText id="codigoPostal" value={cliente.direccion.codigoPostal} onChange={(e) => onInputChange(e, 'direccion.codigoPostal')} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="provincia">Provincia</label>
                            <InputText id="provincia" value={cliente.direccion.provincia} onChange={(e) => onInputChange(e, 'direccion.provincia')} />
                        </div>

                        <div className="p-field">
                            <label htmlFor="telefono">Teléfono</label>
                            <InputText id="telefono" value={cliente.direccion.telefono} onChange={(e) => onInputChange(e, 'direccion.telefono')} />
                        </div>
                    </div>

                    <Divider />

                    <div className="p-p-3">
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-outlined mr-2" onClick={onCancelar} />
                        <Button label="Guardar" icon="pi pi-check" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}
