import { fulfiledType, pendingType ,rejectedType } from "../utils";
import { SEARCH_TEAMS,SEARCH_TEAMS_BY_NAME,ADD_TEAM,DELETE_TEAM,UPDATE_TEAM,GET_TEAM } from "../actions/team";

const initialState = {
    cargando: false,
    todos: [],
    rejected: null
}

export function teams(state = initialState.todos, {type, payload}){

    switch(type){
        case fulfiledType(ADD_TEAM):
        case fulfiledType(DELETE_TEAM):
        case fulfiledType(UPDATE_TEAM):
        case fulfiledType(SEARCH_TEAMS_BY_NAME):
        case fulfiledType(SEARCH_TEAMS):
            return payload;

        case pendingType(SEARCH_TEAMS):
        case pendingType(ADD_TEAM):
        case pendingType(DELETE_TEAM):
        case pendingType(SEARCH_TEAMS_BY_NAME):
        case pendingType(UPDATE_TEAM):
        case pendingType(GET_TEAM):
        case rejectedType(SEARCH_TEAMS):
        case rejectedType(ADD_TEAM):
        case rejectedType(DELETE_TEAM):
        case rejectedType(UPDATE_TEAM):
        case rejectedType(GET_TEAM):
            return state

        default:
            return state

    }
}

export function teamsPending(state = initialState.cargando, {type}){

    switch(type){
        case pendingType(SEARCH_TEAMS):
        case pendingType(ADD_TEAM):
        case pendingType(DELETE_TEAM):
        case pendingType(UPDATE_TEAM):
        case pendingType(GET_TEAM):
        case pendingType(SEARCH_TEAMS_BY_NAME):
            return true

        case fulfiledType(SEARCH_TEAMS):
        case fulfiledType(ADD_TEAM):
        case fulfiledType(DELETE_TEAM):
        case fulfiledType(UPDATE_TEAM):
        case fulfiledType(GET_TEAM):
        case fulfiledType(SEARCH_TEAMS_BY_NAME):
        case rejectedType(SEARCH_TEAMS):   
        case rejectedType(ADD_TEAM):
        case rejectedType(DELETE_TEAM):
        case rejectedType(UPDATE_TEAM):
        case rejectedType(GET_TEAM):
        case rejectedType(SEARCH_TEAMS_BY_NAME):
            return false

        default:
            return state
    }
}

export function teamsRejected(state = initialState.rejected, {type, payload}){

    switch(type){ 
        case rejectedType(SEARCH_TEAMS):
        case rejectedType(ADD_TEAM):
        case rejectedType(DELETE_TEAM):
        case rejectedType(UPDATE_TEAM):
        case rejectedType(GET_TEAM):
        case rejectedType(SEARCH_TEAMS_BY_NAME):
            return payload

        case fulfiledType(SEARCH_TEAMS):
        case fulfiledType(ADD_TEAM):
        case fulfiledType(DELETE_TEAM):
        case fulfiledType(UPDATE_TEAM):
        case fulfiledType(GET_TEAM):
        case fulfiledType(SEARCH_TEAMS_BY_NAME):
        case pendingType(SEARCH_TEAMS):
        case pendingType(ADD_TEAM):
        case pendingType(DELETE_TEAM):
        case pendingType(UPDATE_TEAM):
        case pendingType(GET_TEAM):
        case pendingType(SEARCH_TEAMS_BY_NAME):
            return null

        default:
            return state
    
    } 
}