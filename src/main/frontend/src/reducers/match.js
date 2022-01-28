import { fulfiledType, pendingType ,rejectedType } from "../utils";
import { SEARCH_MATCHS,ADD_MATCH,DELETE_MATCH,UPDATE_MATCH,GET_MATCH } from "../actions/match";

const initialState = {
    cargando: false,
    todos: [],
    rejected: null
}

export function matchs(state = initialState.todos, {type, payload}){

    switch(type){
        case fulfiledType(ADD_MATCH):
        case fulfiledType(DELETE_MATCH):
        case fulfiledType(UPDATE_MATCH):
        case fulfiledType(GET_MATCH):
        case fulfiledType(SEARCH_MATCHS):
            return payload;

        case pendingType(SEARCH_MATCHS):
        case pendingType(ADD_MATCH):
        case pendingType(DELETE_MATCH):
        case pendingType(UPDATE_MATCH):
        case pendingType(GET_MATCH):
        case rejectedType(SEARCH_MATCHS):
        case rejectedType(ADD_MATCH):
        case rejectedType(DELETE_MATCH):
        case rejectedType(UPDATE_MATCH):
        case rejectedType(GET_MATCH):
            return state

        default:
            return state

    }
}

export function matchsPending(state = initialState.cargando, {type}){

    switch(type){
        case pendingType(SEARCH_MATCHS):
        case pendingType(ADD_MATCH):
        case pendingType(DELETE_MATCH):
        case pendingType(UPDATE_MATCH):
        case pendingType(GET_MATCH):
            return true

        case fulfiledType(SEARCH_MATCHS):
        case fulfiledType(ADD_MATCH):
        case fulfiledType(DELETE_MATCH):
        case fulfiledType(UPDATE_MATCH):
        case fulfiledType(GET_MATCH):
        case rejectedType(SEARCH_MATCHS):   
        case rejectedType(ADD_MATCH):
        case rejectedType(DELETE_MATCH):
        case rejectedType(UPDATE_MATCH):
        case rejectedType(GET_MATCH):
            return false

        default:
            return state
    }
}

export function matchsRejected(state = initialState.rejected, {type, payload}){

    switch(type){ 
        case rejectedType(SEARCH_MATCHS):
        case rejectedType(ADD_MATCH):
        case rejectedType(DELETE_MATCH):
        case rejectedType(UPDATE_MATCH):
        case rejectedType(GET_MATCH):
            return payload

        case fulfiledType(SEARCH_MATCHS):
        case fulfiledType(ADD_MATCH):
        case fulfiledType(DELETE_MATCH):
        case fulfiledType(UPDATE_MATCH):
        case fulfiledType(GET_MATCH):
        case pendingType(SEARCH_MATCHS):
        case pendingType(ADD_MATCH):
        case pendingType(DELETE_MATCH):
        case pendingType(UPDATE_MATCH):
        case pendingType(GET_MATCH):
            return null

        default:
            return state
    
    } 
}