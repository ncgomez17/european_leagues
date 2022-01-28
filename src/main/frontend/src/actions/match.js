// Este archivo contiene exportables de actions y action creators de Redux
import api from "../services/matchService";
// ACTIONS MATCHS 
export const SEARCH_MATCHS = "SEARCH_MATCHS";
export const ADD_MATCH = "ADD_MATCH";
export const DELETE_MATCH = "DELETE_MATCH";
export const GET_MATCH = "GET_MATCH";
export const UPDATE_MATCH= "UPDATE_MATCH";

// ACTION MATCHS

export const searchMatchs = () =>({
  type: SEARCH_MATCHS,
  payload: api.getAllMatchs().then(data => data.data)
})
export const addMatch = (matchDTO) =>({
  type: ADD_MATCH,
  payload: api.addMatch(matchDTO).then(data => data.data),
})

export const getMatch = (id) =>({
  type: GET_MATCH,
  payload: api.getMatch(id).then(data => data.data),
})

export const deleteMatch = (id) =>({
  type: DELETE_MATCH,
  payload: api.deleteMatch(id).then(data => data.data),
})

export const updateMatch = (matchDTO) =>({
  type: UPDATE_MATCH,
  payload: api.updateMatch(matchDTO).then(data => data.data),
})