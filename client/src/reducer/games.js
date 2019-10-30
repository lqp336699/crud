import { SET_GAMES } from '../constants';

export const games = (state=[],action={})=>{
    switch(action.type){
        case SET_GAMES:
            return action.games;
        default: return state;
    }
};