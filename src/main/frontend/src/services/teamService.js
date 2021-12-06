import clienteREST from "./clienteREST";

class ClientesService {
  buscarTodos() {
    return clienteREST.get("/clientes");
  }

  buscarPorDNI(dni) {
    return clienteREST.get(`/clientes/${dni}`);
  }

  crear(data) {
    return clienteREST.post("/clientes", data);
  }

  modificar(dni, data) {
    return clienteREST.put(`/clientes/${dni}`, data);
  }

  eliminar(dni) {
    return clienteREST.delete(`/clientes/${dni}`);
  }

  buscarPorNombre(nombre) {
    return clienteREST.get(`/clientes?nombre=${nombre}`);
  }

  buscarPorLocalidad(localidad) {
    return clienteREST.get(`/clientes?localidad=${localidad}`);
  }
}

export default new ClientesService();