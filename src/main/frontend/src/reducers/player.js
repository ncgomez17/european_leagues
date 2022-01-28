import { fulfiledType, pendingType ,rejectedType } from "../utils";
import { SEARCH_PLAYERS,SEARCH_PLAYERS_BY_NAME,ADD_PLAYER,DELETE_PLAYER,UPDATE_PLAYER,GET_PLAYER } from "../actions/player";

const initialState = {
    cargando: false,
    todos: [],
    rejected: null
}

export function players(state = initialState.todos, {type, payload}){

    switch(type){
        case fulfiledType(ADD_PLAYER):
        case fulfiledType(DELETE_PLAYER):
        case fulfiledType(UPDATE_PLAYER):
        case fulfiledType(SEARCH_PLAYERS_BY_NAME):
        case fulfiledType(GET_PLAYER):
        case fulfiledType(SEARCH_PLAYERS):
            return payload;

        case pendingType(SEARCH_PLAYERS):
        case pendingType(ADD_PLAYER):
        case pendingType(DELETE_PLAYER):
        case pendingType(SEARCH_PLAYERS_BY_NAME):
        case pendingType(UPDATE_PLAYER):
        case pendingType(GET_PLAYER):
        case rejectedType(SEARCH_PLAYERS):
        case rejectedType(ADD_PLAYER):
        case rejectedType(DELETE_PLAYER):
        case rejectedType(UPDATE_PLAYER):
        case rejectedType(GET_PLAYER):
            return state

        default:
            return state

    }
}

export function playersPending(state = initialState.cargando, {type}){

    switch(type){
        case pendingType(SEARCH_PLAYERS):
        case pendingType(ADD_PLAYER):
        case pendingType(DELETE_PLAYER):
        case pendingType(UPDATE_PLAYER):
        case pendingType(GET_PLAYER):
        case pendingType(SEARCH_PLAYERS_BY_NAME):
            return true

        case fulfiledType(SEARCH_PLAYERS):
        case fulfiledType(ADD_PLAYER):
        case fulfiledType(DELETE_PLAYER):
        case fulfiledType(UPDATE_PLAYER):
        case fulfiledType(GET_PLAYER):
        case fulfiledType(SEARCH_PLAYERS_BY_NAME):
        case rejectedType(SEARCH_PLAYERS):   
        case rejectedType(ADD_PLAYER):
        case rejectedType(DELETE_PLAYER):
        case rejectedType(UPDATE_PLAYER):
        case rejectedType(GET_PLAYER):
        case rejectedType(SEARCH_PLAYERS_BY_NAME):
            return false

        default:
            return state
    }
}

export function playersRejected(state = initialState.rejected, {type, payload}){

    switch(type){ 
        case rejectedType(SEARCH_PLAYERS):
        case rejectedType(ADD_PLAYER):
        case rejectedType(DELETE_PLAYER):
        case rejectedType(UPDATE_PLAYER):
        case rejectedType(GET_PLAYER):
        case rejectedType(SEARCH_PLAYERS_BY_NAME):
            return payload

        case fulfiledType(SEARCH_PLAYERS):
        case fulfiledType(ADD_PLAYER):
        case fulfiledType(DELETE_PLAYER):
        case fulfiledType(UPDATE_PLAYER):
        case fulfiledType(GET_PLAYER):
        case fulfiledType(SEARCH_PLAYERS_BY_NAME):
        case pendingType(SEARCH_PLAYERS):
        case pendingType(ADD_PLAYER):
        case pendingType(DELETE_PLAYER):
        case pendingType(UPDATE_PLAYER):
        case pendingType(GET_PLAYER):
        case pendingType(SEARCH_PLAYERS_BY_NAME):
            return null

        default:
            return state
    
    } 
}