import { SET_GAMES,DELETE_GAME } from '../constants';

export const games = (state=[],action={})=>{
    switch(action.type){
        case SET_GAMES:
            return action.games;
        case DELETE_GAME:
            console.log("66666");
            return state.filter(game => game._id !== action.id);
        default: return state;
    }
};