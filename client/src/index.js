import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore,applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { rootReducers } from './reducer/index';
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension"
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom"
import Game from './components/games'
import New from './components/new'
import thunk from 'redux-thunk'

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(logger,thunk))
);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div className='ui container'>
                <div className="ui three item menu">
                    <NavLink exact className="item"  to='/'>HOME</NavLink>
                    <NavLink exact className="item"  to='/game'>GAME</NavLink>
                    <NavLink className="item"  to='/new'>ADD NEW GAME</NavLink>
                </div>
                <Route path='/' exact component={ App }/>
                <Route path='/game'   component={ Game }/>
                <Route path='/new'  component={ New }/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);


serviceWorker.unregister();
