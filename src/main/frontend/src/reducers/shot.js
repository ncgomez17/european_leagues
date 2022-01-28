import { fulfiledType, pendingType ,rejectedType } from "../utils";
import { SEARCH_SHOTS,SEARCH_SHOTS_BY_NAME,ADD_SHOT,DELETE_SHOT,UPDATE_SHOT,GET_SHOT } from "../actions/shot";

const initialState = {
    cargando: false,
    todos: [],
    rejected: null
}

export function shots(state = initialState.todos, {type, payload}){

    switch(type){
        case fulfiledType(ADD_SHOT):
        case fulfiledType(DELETE_SHOT):
        case fulfiledType(UPDATE_SHOT):
        case fulfiledType(SEARCH_SHOTS_BY_NAME):
        case fulfiledType(GET_SHOT):
        case fulfiledType(SEARCH_SHOTS):
            return payload;

        case pendingType(SEARCH_SHOTS):
        case pendingType(ADD_SHOT):
        case pendingType(DELETE_SHOT):
        case pendingType(SEARCH_SHOTS_BY_NAME):
        case pendingType(UPDATE_SHOT):
        case pendingType(GET_SHOT):
        case rejectedType(SEARCH_SHOTS):
        case rejectedType(ADD_SHOT):
        case rejectedType(DELETE_SHOT):
        case rejectedType(UPDATE_SHOT):
        case rejectedType(GET_SHOT):
            return state

        default:
            return state

    }
}

export function shotsPending(state = initialState.cargando, {type}){

    switch(type){
        case pendingType(SEARCH_SHOTS):
        case pendingType(ADD_SHOT):
        case pendingType(DELETE_SHOT):
        case pendingType(UPDATE_SHOT):
        case pendingType(GET_SHOT):
        case pendingType(SEARCH_SHOTS_BY_NAME):
            return true

        case fulfiledType(SEARCH_SHOTS):
        case fulfiledType(ADD_SHOT):
        case fulfiledType(DELETE_SHOT):
        case fulfiledType(UPDATE_SHOT):
        case fulfiledType(GET_SHOT):
        case fulfiledType(SEARCH_SHOTS_BY_NAME):
        case rejectedType(SEARCH_SHOTS):   
        case rejectedType(ADD_SHOT):
        case rejectedType(DELETE_SHOT):
        case rejectedType(UPDATE_SHOT):
        case rejectedType(GET_SHOT):
        case rejectedType(SEARCH_SHOTS_BY_NAME):
            return false

        default:
            return state
    }
}

export function shotsRejected(state = initialState.rejected, {type, payload}){

    switch(type){ 
        case rejectedType(SEARCH_SHOTS):
        case rejectedType(ADD_SHOT):
        case rejectedType(DELETE_SHOT):
        case rejectedType(UPDATE_SHOT):
        case rejectedType(GET_SHOT):
        case rejectedType(SEARCH_SHOTS_BY_NAME):
            return payload

        case fulfiledType(SEARCH_SHOTS):
        case fulfiledType(ADD_SHOT):
        case fulfiledType(DELETE_SHOT):
        case fulfiledType(UPDATE_SHOT):
        case fulfiledType(GET_SHOT):
        case fulfiledType(SEARCH_SHOTS_BY_NAME):
        case pendingType(SEARCH_SHOTS):
        case pendingType(ADD_SHOT):
        case pendingType(DELETE_SHOT):
        case pendingType(UPDATE_SHOT):
        case pendingType(GET_SHOT):
        case pendingType(SEARCH_SHOTS_BY_NAME):
            return null

        default:
            return state
    
    } 
}