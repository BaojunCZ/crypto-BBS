/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import {checkPlayer} from "../../utils/CheckPlayer";
import BottomTabs from '../../components/BottomTabs/BottomTabs'
import {address1, address2} from "../../contract/test.config";
import Loading from "react-loading-animation"
import UserInfo from "./UserInfo"
import PartingLine from "../../components/PartingLine"

export default class Mine extends React.Component {

    constructor() {
        super();
        this.state = {
            player: {name: 'name', icon: '', sex: true},
            loading: true
        }
    }

    componentDidMount() {
        checkPlayer(address2)
            .then(player => {
                this.setState({player: player, loading: false})
            })
            .catch(err => {
                this.setState({loading: false})
                if (err === "未注册") {
                    this.props.history.push("/signIn");
                } else {
                    alert(err)
                }
            })
    }

    render() {
        return (
            <div>
                <div style={Styles.Container}>
                    <UserInfo player={this.state.player}
                              style={Styles.UserInfo}/>
                    <PartingLine/>
                </div>
                <BottomTabs select={3}/>
                {this._loading()}
            </div>
        )
    }

    _loading() {
        if (this.state.loading)
            return (<Loading/>)
        else
            return null
    }
}

const Styles = {
    Container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

    },
    UserInfo: {
        marginTop: 30,
    }
}