/**
 * Created by 包俊 on 2018/9/5.
 */
import React from "react";
import {
    deploy,
    getNowPage,
    getOwner,
    sendMessage,
    getPageMsgIDs
} from "../contract/utils/tokenStore"
import {initPlayer, setName, getPlayer} from "../contract/utils/UserInfoUtils"
import {address1, address2} from "../contract/test.config"

export default class Test extends React.Component {

    constructor() {
        super()
        this.state = {
            initPlayerName: '',
            getPageMsgIDs: '',
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <button style={Styles.Button} onClick={() => this._deploy()}>部署</button>
                <div style={Styles.InitPlayer}>
                    <input onChange={e => this._initPlayerValue(e)}/>
                    <button style={Styles.Button} onClick={() => this._initPlayer()}>初始化</button>
                </div>
                <button style={Styles.Button} onClick={() => this._sendMessage()}>发帖</button>
                <div style={Styles.InitPlayer}>
                    <input onChange={e => this._getPageMsgIDsValue(e)}/>
                    <button style={Styles.Button} onClick={() => this._getPageMsgIDs()}>帖子ID</button>
                </div>
                <button style={Styles.Button} onClick={() => this._setName()}>修改用户名</button>
                <button style={Styles.Button} onClick={() => this._getPlayer()}>获取用户</button>
                <button style={Styles.Button} onClick={() => this._getNowPage()}>page</button>
                <button style={Styles.Button} onClick={() => this._getOwner()}>owner</button>
            </div>
        )
    }

    _deploy() {
        deploy(["1", "2", "3"]).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    _initPlayerValue(e) {
        this.setState({initPlayerName: e.target.value})
    }

    _initPlayer() {
        initPlayer(this.state.initPlayerName, true, "https://s1.ax1x.com/2018/09/07/iP1JNF.jpg").then(res => {
            // initPlayer(this.state.initPlayerName, true, "11").then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    _setName() {
        setName(this.state.initPlayerName).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    _getPlayer() {
        getPlayer(address2).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    _sendMessage() {
        sendMessage("1111", "222").then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    _getNowPage() {
        getNowPage().then(ID => {
            alert(ID)
        }).catch(err => {
            console.log(err)
        })
    }

    _getPageMsgIDsValue(e) {
        this.setState({getPageMsgIDs: e.target.value})
    }

    _getPageMsgIDs() {
        getPageMsgIDs(this.state.getPageMsgIDs).then(ID => {
            alert(ID)
        }).catch(err => {
            console.log(err)
        })
    }

    _getOwner() {
        getOwner().then(address => {
            alert(address)
        }).catch(err => {
            console.log(err)
        })
    }
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: "column",
        flex: 1
    },
    Button: {
        width: "100px"
    },
    InitPlayer: {
        display: 'flex',
        flexDirection: "column"
    }
}