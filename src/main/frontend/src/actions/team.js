// Este archivo contiene exportables de actions y action creators de Redux
import api from "../services/teamService";
// ACTIONS TEAMS 
export const SEARCH_TEAMS = "SEARCH_TEAMS";
export const ADD_TEAM = "ADD_TEAM";
export const DELETE_TEAM = "DELETE_TEAM";
export const GET_TEAM = "GET_TEAM";
export const UPDATE_TEAM= "UPDATE_TEAM";
export const SEARCH_TEAMS_BY_NAME= "SEARCH_TEAMS_BY_NAME";

// ACTION TEAMS

export const searchTeams = () =>({
  type: SEARCH_TEAMS,
  payload: api.getAllTeams().then(data => data.data)
})

export const searchTeamsByName = (name) =>({
  type: SEARCH_TEAMS_BY_NAME,
  payload: api.searchTeam(name).then(data => data.data),
})

export const addTeam = (teamDTO) =>({
  type: ADD_TEAM,
  payload: api.addTeam(teamDTO).then(data => data.data),
})

export const getTeam = (id) =>({
  type: GET_TEAM,
  payload: api.getTeam(id).then(data => data.data),
})

export const deleteTeam = (id) =>({
  type: DELETE_TEAM,
  payload: api.deleteTeam(id).then(data => data.data),
})

export const updateTeam = (teamDTO) =>({
  type: UPDATE_TEAM,
  payload: api.updateTeam(teamDTO).then(data => data.data),
})


