import { fulfiledType, pendingType ,rejectedType } from "../utils";
import { SEARCH_INCIDENTS,SEARCH_INCIDENTS_BY_NAME,ADD_INCIDENT,DELETE_INCIDENT,UPDATE_INCIDENT,GET_INCIDENT } from "../actions/incident";

const initialState = {
    cargando: false,
    todos: [],
    rejected: null
}

export function incidents(state = initialState.todos, {type, payload}){

    switch(type){
        case fulfiledType(ADD_INCIDENT):
        case fulfiledType(DELETE_INCIDENT):
        case fulfiledType(UPDATE_INCIDENT):
        case fulfiledType(SEARCH_INCIDENTS_BY_NAME):
        case fulfiledType(GET_INCIDENT):
        case fulfiledType(SEARCH_INCIDENTS):
            return payload;

        case pendingType(SEARCH_INCIDENTS):
        case pendingType(ADD_INCIDENT):
        case pendingType(DELETE_INCIDENT):
        case pendingType(SEARCH_INCIDENTS_BY_NAME):
        case pendingType(UPDATE_INCIDENT):
        case pendingType(GET_INCIDENT):
        case rejectedType(SEARCH_INCIDENTS):
        case rejectedType(ADD_INCIDENT):
        case rejectedType(DELETE_INCIDENT):
        case rejectedType(UPDATE_INCIDENT):
        case rejectedType(GET_INCIDENT):
            return state

        default:
            return state

    }
}

export function incidentsPending(state = initialState.cargando, {type}){

    switch(type){
        case pendingType(SEARCH_INCIDENTS):
        case pendingType(ADD_INCIDENT):
        case pendingType(DELETE_INCIDENT):
        case pendingType(UPDATE_INCIDENT):
        case pendingType(GET_INCIDENT):
        case pendingType(SEARCH_INCIDENTS_BY_NAME):
            return true

        case fulfiledType(SEARCH_INCIDENTS):
        case fulfiledType(ADD_INCIDENT):
        case fulfiledType(DELETE_INCIDENT):
        case fulfiledType(UPDATE_INCIDENT):
        case fulfiledType(GET_INCIDENT):
        case fulfiledType(SEARCH_INCIDENTS_BY_NAME):
        case rejectedType(SEARCH_INCIDENTS):   
        case rejectedType(ADD_INCIDENT):
        case rejectedType(DELETE_INCIDENT):
        case rejectedType(UPDATE_INCIDENT):
        case rejectedType(GET_INCIDENT):
        case rejectedType(SEARCH_INCIDENTS_BY_NAME):
            return false

        default:
            return state
    }
}

export function incidentsRejected(state = initialState.rejected, {type, payload}){

    switch(type){ 
        case rejectedType(SEARCH_INCIDENTS):
        case rejectedType(ADD_INCIDENT):
        case rejectedType(DELETE_INCIDENT):
        case rejectedType(UPDATE_INCIDENT):
        case rejectedType(GET_INCIDENT):
        case rejectedType(SEARCH_INCIDENTS_BY_NAME):
            return payload

        case fulfiledType(SEARCH_INCIDENTS):
        case fulfiledType(ADD_INCIDENT):
        case fulfiledType(DELETE_INCIDENT):
        case fulfiledType(UPDATE_INCIDENT):
        case fulfiledType(GET_INCIDENT):
        case fulfiledType(SEARCH_INCIDENTS_BY_NAME):
        case pendingType(SEARCH_INCIDENTS):
        case pendingType(ADD_INCIDENT):
        case pendingType(DELETE_INCIDENT):
        case pendingType(UPDATE_INCIDENT):
        case pendingType(GET_INCIDENT):
        case pendingType(SEARCH_INCIDENTS_BY_NAME):
            return null

        default:
            return state
    
    } 
}