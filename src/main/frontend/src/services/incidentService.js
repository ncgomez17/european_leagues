import clientREST from "./clientREST";

  const getAllIncidents = () => {
    return clientREST.get("/incident");
  }

  const getIncident = (id) => {
    return clientREST.get(`/incident/${id}`);
  }

  const createIncident = (incidentDto) => {
    return clientREST.post("/incident", incidentDto);
  }

  const updateIncident = (incidentDto) => {
    return clientREST.put("/incident", incidentDto);
  }

  const deleteIncident = (id) => {
    return clientREST.delete(`/incident/${id}`);
  }

  const searchIncidentByPlayerName = (playerName) => {
    return clientREST.get(`/incident/search/${playerName}`);
  }

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,
  searchIncidentByPlayerName
}