import React,{ Component } from 'react';
import { connect } from 'react-redux'
import  classnames from 'classnames'
import { saveGame } from './../actions/save'
import { Redirect } from 'react-router-dom'

class EditGame extends Component{

    state = {
        cover:'',
        name:'',
        error:'',
        loading:false,
        done:false
    };

    handelChange = (e)=>{
        if(!!this.state.error[e.target.name]){
            let error = Object.assign({},this.state.error);
            delete error[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                error
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    };

    handelSubmit = (e)=>{
        let error = {};
        if(this.state.cover === ''){error.cover = 'can not be empty'}
        if(this.state.name === ''){error.name = 'can not be empty'}
        this.setState({error});

        const isValid = Object.keys(error).length===0;
        if(isValid){
            const { cover,name } = this.state;
            this.setState({loading:true});
            this.props.saveGame({ cover,name }).then(
                ()=>{this.setState({done:true})},
                (err)=>err.response.json().then(({ errors }) => { this.setState({ errors, loading: false }) })
            )
        }

    };

    render() {

        const renderImg = (
            <img src={this.state.cover} className="ui small image" alt=""/>
        );

        const from = (
            <div className="ui form">
                <h1>添加游戏</h1>

                <div className="field">
                    <label>图片地址</label>
                    <input
                        type="text"
                        name="cover"
                        onChange={ this.handelChange }
                    />
                    <p>{ this.state.error.cover}</p>
                </div>

                {this.state.cover !== '' && renderImg }

                <div className="field">
                    <label>名字</label>
                    <input
                        type="text"
                        name="name"
                        onChange={ this.handelChange }
                    />
                    <p>{ this.state.error.name}</p>
                </div>

                <div
                    className="ui primary button"
                    onClick={this.handelSubmit}
                >
                    Save
                </div>

                <div className={classnames('ui','inverted','dimmer',{'active':this.state.loading} )}>
                    <div className="ui text loader">Loading</div>
                </div>

            </div>
        );

        return(
            <div>
                { this.state.done ? <Redirect to="/games" /> : from }
            </div>
        )
    }
}

export default connect(null,{ saveGame  })(EditGame);