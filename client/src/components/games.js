import React,{ Component } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { fetchGame } from './../actions/index'

class Game extends Component{
    render() {
        const emptyMessage = (
            <p>Three are no games yet in collection</p>
        );
        const gamesList =(
            <p>
                {this.props.games.map(game=>{
                    return(
                        <div>{game.text}</div>
                    )
                })}
            </p>
        );
        return(
            <div>
                { this.props.games.length===0? emptyMessage : gamesList}
            </div>
        )
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

export default connect(mapStateToProps,{ fetchGame }) (Game);