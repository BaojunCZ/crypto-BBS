/**
 * Created by 包俊 on 2018/9/18.
 */
import React from 'react'
import {getPlayer} from "../contract/utils/UserInfoUtils";

export default class DiscussInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            writer: 'somebody',
            to: '',
            info: '',
            time: ''
        }
    }

    componentDidMount() {
        getPlayer(this.props.info[0]).then((player) => {
            if (player.playerAddress.toLowerCase() === this.props.info[0].toLowerCase()) {
                this.setState({writer: player.name})
            }
        }).catch(err => console.log(err))
        this.setState({info: this.props.info[2]})
    }

    render() {
        return (
            <div style={Styles.Container}>
                <text style={Styles.NameText}>{this.state.writer}</text>
                <text style={Styles.InfoText}>{this.state.info}</text>
            </div>
        )
    }
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 70,
        marginTop: 10
    },
    NameText: {
        fontSize: 13,
        color: '#456cff',
    },
    InfoText: {
        fontSize: 15,
    }
}