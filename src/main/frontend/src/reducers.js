import { combineReducers } from 'redux';
import {teams,teamsPending,teamsRejected} from './reducers/team';
import {players,playersPending,playersRejected} from './reducers/player';
import {matchs,matchsPending,matchsRejected} from './reducers/match';
import {incidents,incidentsPending,incidentsRejected} from './reducers/incident';
import {shots,shotsPending,shotsRejected} from './reducers/shot';
/**
 * El export default de este archivo corresponde a un reducer general formado por cada
 * uno de los reducers independientes que componen el proyecto.
 */
export default combineReducers({
  teams,
  teamsPending,
  teamsRejected,
  players,
  playersPending,
  playersRejected,
  matchs,
  matchsPending,
  matchsRejected,
  incidents,
  incidentsPending,
  incidentsRejected,
  shots,
  shotsPending,
  shotsRejected
});

/**
 * Aquí se exportan de manera específica zonas concretas del state de redux en forma de métodos.
 * Lo hacemos de esta manera para mantener el control sobre el mismo y no realizar un acceso indiscriminado
 * al state.
 * Todas las funciones deben contar al menos con el parámetro "state" representando el state de redux en cada
 * momento. Accedemos siempre a state.<nombreDelReducer>.<propiedad>, y la devolvemos o tratamos una copia de 
 * la misma antes de devolverla.
 */

export const getTeams = (state) => state.teams;
export const isTeamsPending = (state) => state.teamsPending;
export const isTeamsRejected = (state) => state.teamsRejected;

export const getPlayers = (state) => state.players;
export const isPlayersPending = (state) => state.playersPending;
export const isPlayersRejected = (state) => state.playersRejected;

export const getIncidents = (state) => state.incidents;
export const isIncidentsPending = (state) => state.incidentsPending;
export const isIncidentsRejected = (state) => state.incidentsRejected;

export const getMatchs= (state) => state.matchs;
export const isMatchsPending = (state) => state.matchsPending;
export const isMatchsRejected = (state) => state.matchsRejected;

export const getShots = (state) => state.shots;
export const isShotsPending = (state) => state.shotsPending;
export const isShotsRejected = (state) => state.shotsRejected;

