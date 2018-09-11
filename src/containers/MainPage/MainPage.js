/**
 * Created by 包俊 on 2018/9/11.
 */
import React from "react"
import Home from '../Home/Home'
import Mine from '../Mine/Mine'
import Favorite from '../Favorite/Favorite'
import BottomTabs from '../../components/BottomTabs'

export default class MainPage extends React.Component {

    constructor() {
        super()
        this.state = {
            select: 2
        }
    }

    render() {
        return (
            <div>
                {this._render()}
                <BottomTabs click={position => this._clickTab(position)}/>
            </div>
        )
    }

    _render() {
        switch (this.state.select) {
            case 1:
                return (<Favorite history={this.props.history}/>)
                break
            case 2:
                return (<Home history={this.props.history}/>)
                break
            case 3:
                return (<Mine history={this.props.history}/>)
                break
        }
    }

    _clickTab(position) {
        if (position != this.state.select)
            this.setState({select: position})
    }
}