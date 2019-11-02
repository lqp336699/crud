import {
    SAVE_GAME
} from './../constants'



export const saveGame = (game)=>{
    return dispatch =>{
     return fetch('/api/save',{
          method: 'post',
          body:JSON.stringify(game),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      })
    };

};