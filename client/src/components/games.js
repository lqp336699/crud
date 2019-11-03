import React,{ Component } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { fetchGame } from './../actions/index'
import { deleteGame } from "../actions/delete";
import { Link,NavLink } from 'react-router-dom'

class Game extends Component{
    render() {
        const emptyMessage = (
            <p>Three are no games yet in collection</p>
        );
        const gamesList =(
            <div className="ui five cards">
                {this.props.games.map(game=>{
                    return(
                            <div className="card" key={game._id}>
                                <div className="image">
                                    <img alt={game.name} title={game.name} src={game.cover} />
                                </div>
                                <div className="extra content">
                                    <div className="ui two buttons">
                                        <NavLink to={`/game/${game._id}`} className="ui basic green button">编辑</NavLink>
                                        <div className="ui basic red button" onClick={ ()=>{this.deleteGame(game._id)} }>删除</div>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
        );
        return(
            <div>
                { this.props.games.length===0? emptyMessage : gamesList}
            </div>
        )
    };

    deleteGame =(id)=>{
        this.props.deleteGame(id);
    };

    componentDidMount() {
        this.props.fetchGame();
    }
}

Game.propTypes = {
    games: propTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
    games:state.games
  };
};

export default connect(mapStateToProps,{ fetchGame,deleteGame }) (Game);