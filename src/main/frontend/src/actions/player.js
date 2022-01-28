// Este archivo contiene exportables de actions y action creators de Redux
import api from "../services/playerService";
// ACTIONS PLAYERS 
export const SEARCH_PLAYERS = "SEARCH_PLAYERS";
export const ADD_PLAYER = "ADD_PLAYER";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const GET_PLAYER = "GET_PLAYER";
export const UPDATE_PLAYER= "UPDATE_PLAYER";
export const SEARCH_PLAYERS_BY_NAME= "SEARCH_PLAYERS_BY_NAME";

// ACTION PLAYERS

export const searchPlayers = () =>({
  type: SEARCH_PLAYERS,
  payload: api.getAllPlayers().then(data => data.data)
})

export const searchPlayerByName = (name) =>({
  type: SEARCH_PLAYERS_BY_NAME,
  payload: api.searchPlayer(name).then(data => data.data),
})

export const addPlayer = (playerDTO) =>({
  type: ADD_PLAYER,
  payload: api.addPlayer(playerDTO).then(data => data.data),
})

export const getPlayer = (id) =>({
  type: GET_PLAYER,
  payload: api.getPlayer(id).then(data => data.data),
})

export const deletePlayer = (id) =>({
  type: DELETE_PLAYER,
  payload: api.deletePlayer(id).then(data => data.data),
})

export const updatePlayer = (playerDTO) =>({
  type: UPDATE_PLAYER,
  payload: api.updatePlayer(playerDTO).then(data => data.data),
})