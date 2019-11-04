import { DELETE_GAME } from '../constants'


export const gameDelete=(id)=>{
    return{
        type:DELETE_GAME,
        id
    }
};

export const deleteGame =(id)=>{
    return dispatch =>{
       return fetch(`/game/${id}`,
           {
               method:'post',
               headers:{
                   'content-type' : 'application/json'
               }
           }
           )
           .then( dispatch(gameDelete(id)))
    }
};
