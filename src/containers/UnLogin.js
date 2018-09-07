/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import BottomTabs from '../components/BottomTabs/BottomTabs'
import {CommonStyles} from "../components/Styles"
import {initPlayer} from "../contract/utils/UserInfoUtils"
import Loading from "react-loading-animation"

export default class UnLogin extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            button: CommonStyles.ButtonClickAble,
            loading: false
        }
    }

    render() {
        return (
            <div>
                <div style={Styles.Container}>
                    <text style={Styles.Title}>注册</text>
                    <div style={Styles.UserName}>
                        <text style={Styles.UserText}>昵称</text>
                        <input style={Styles.UserInput} onChange={e => this._inputValue(e)}/>
                    </div>
                    <text style={this.state.button} onClick={() => this._loginIn()}>确定</text>
                </div>
                <BottomTabs select={3}/>
                {this._loading()}
            </div>
        )
    }

    _inputValue(e) {
        this.setState({userName: e.target.value})
    }

    _loginIn() {
        if (this.state.userName !== '') {
            this.setState({loading: true})
            initPlayer(this.state.userName).then(res => {
                this.props.history.push("/mine")
            }).catch(err => {
                alert(err)
                this.setState({loading: false})
            })
        }
        else
            alert('请输入昵称')
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
        flexDirection: 'column',
        alignItems: 'center',
    },
    Title: {
        fontSize: 24,
        marginTop: 50,
        color: '#2E313E'
    },
    UserName: {
        display: 'flex',
        marginTop: 70
    },
    UserText: {
        fontSize: 14,
    },
    UserInput: {
        marginLeft: 10,
    }
}