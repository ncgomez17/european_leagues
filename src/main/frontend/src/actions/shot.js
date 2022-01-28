// Este archivo contiene exportables de actions y action creators de Redux
import api from "../services/shotService";
// ACTIONS SHOTS 
export const SEARCH_SHOTS = "SEARCH_SHOTS";
export const ADD_SHOT = "ADD_SHOT";
export const DELETE_SHOT = "DELETE_SHOT";
export const GET_SHOT = "GET_SHOT";
export const UPDATE_SHOT= "UPDATE_SHOT";
export const SEARCH_SHOTS_BY_NAME= "SEARCH_SHOTS_BY_NAME";

// ACTION SHOTS

export const searchShots = () =>({
  type: SEARCH_SHOTS,
  payload: api.getAllShots().then(data => data.data)
})

export const searchShotByName = (name) =>({
  type: SEARCH_SHOTS_BY_NAME,
  payload: api.searchShotByPlayerName(name).then(data => data.data),
})

export const addShot = (shotDTO) =>({
  type: ADD_SHOT,
  payload: api.addSHOT(shotDTO).then(data => data.data),
})

export const getSHOT = (id) =>({
  type: GET_SHOT,
  payload: api.getShot(id).then(data => data.data),
})

export const deleteSHOT = (id) =>({
  type: DELETE_SHOT,
  payload: api.deleteShot(id).then(data => data.data),
})

export const updateSHOT = (shotDTO) =>({
  type: UPDATE_SHOT,
  payload: api.updateShot(shotDTO).then(data => data.data),
})