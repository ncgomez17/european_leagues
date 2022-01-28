// Este archivo contiene exportables de actions y action creators de Redux
import api from "../services/incidentService";
// ACTIONS INCIDENTS 
export const SEARCH_INCIDENTS = "SEARCH_INCIDENTS";
export const ADD_INCIDENT = "ADD_INCIDENT";
export const DELETE_INCIDENT = "DELETE_INCIDENT";
export const GET_INCIDENT = "GET_INCIDENT";
export const UPDATE_INCIDENT= "UPDATE_INCIDENT";
export const SEARCH_INCIDENTS_BY_NAME= "SEARCH_INCIDENTS_BY_NAME";

// ACTION INCIDENTS

export const searchIncidents = () =>({
  type: SEARCH_INCIDENTS,
  payload: api.getAllIncidents().then(data => data.data)
})

export const searchIncidentByName = (name) =>({
  type: SEARCH_INCIDENTS_BY_NAME,
  payload: api.searchIncidentByPlayerName(name).then(data => data.data),
})

export const addIncident = (incidentDTO) =>({
  type: ADD_INCIDENT,
  payload: api.addIncident(incidentDTO).then(data => data.data),
})

export const getINCIDENT = (id) =>({
  type: GET_INCIDENT,
  payload: api.getIncident(id).then(data => data.data),
})

export const deleteIncident = (id) =>({
  type: DELETE_INCIDENT,
  payload: api.deleteIncident(id).then(data => data.data),
})

export const updateIncident = (incidentDTO) =>({
  type: UPDATE_INCIDENT,
  payload: api.updateIncident(incidentDTO).then(data => data.data),
})