import { DELETE_GAME } from '../constants'


export const gameDelete=(id)=>{
    return{
        type:DELETE_GAME,
        id
    }
};

export const deleteGame =(id)=>{
    return dispatch =>{
       return fetch(`/api/game/${id}`,
           {
               method:'delete',
               headers: new Headers({
                   'Content-Type': 'application/json'
               })
           }
           )
           .then( dispatch(gameDelete(id)))
    }
};
