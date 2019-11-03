import { DELETE_GAME } from '../constants'


export const gameDelete=(id)=>{
    return{
        type:DELETE_GAME,
        id
    }
};

export const deleteGame =(id)=>{
    return dispatch =>{
       return fetch(`/game/${id}`,{ method:'delete'})
           .then( dispatch(gameDelete(id)))
    }
};
