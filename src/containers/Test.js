/**
 * Created by 包俊 on 2018/9/5.
 */
import React from "react";
import {deploy} from "../contract/utils/tokenStore"
import {favorite, isFavorite, sendMsg} from "../contract/utils/MsgUtils"
import {getFavoriteSize, getPlayer, initPlayer, setName} from "../contract/utils/UserInfoUtils"
import {getBBSInfo} from "../contract/utils/BBSInfoUtils"

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
                <button style={Styles.Button} onClick={() => this._setName()}>修改用户名</button>
                <button style={Styles.Button} onClick={() => this._getPlayer()}>获取用户</button>
                <button style={Styles.Button} onClick={() => this._getOwner()}>owner</button>
                <button style={Styles.Button} onClick={() => this._getFavoriteSize()}>收藏数</button>
                <button style={Styles.Button} onClick={() => this._favorite()}>收藏</button>
                <button style={Styles.Button} onClick={() => this._isFavorite()}>是否收藏</button>
            </div>
        )
    }

    _deploy() {
        deploy(["", "一个成熟的应用公链解决方案", "Nervos AppChain 是一个成熟的应用公链解决方案，用在Nervos Network的第二层，提供高性能的计算和应用或行业共识。 我们在市场痛点调研中发现，很多行业或企业联盟有商业资源，具备一定传统应用系统的开发能力，也有意愿搭建一条自己的区块链，但当前市场并没有一个完整的的技术方案来支撑开发，并且也没有良好的生态支撑。许多应用开发者想要开发一些酷炫的区块链应用，但他们常常被以太坊的低性能所拖累。Nervos AppChain 主要为B端用户解决「搭建区块链困难」和「开发区块链应用困难」这两个区块链落地的核心问题。", "https://s1.ax1x.com/2018/09/10/iiO6N4.jpg"]).then(res => {
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
        getPlayer(window.neuron.getAccount()).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    _sendMessage() {
        sendMsg("https://s1.ax1x.com/2018/09/07/iP1JNF.jpg", "芒果").then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    _getOwner() {
        getBBSInfo("Owner").then(address => {
            alert(address)
        }).catch(err => {
            console.log(err)
        })
    }

    _getFavoriteSize() {
        getFavoriteSize().then(size => {
            alert(size)
        }).catch(err => {
            console.log(err)
        })
    }

    _favorite() {
        favorite('1537257839638').then(res => {
            alert("success")
        }).catch(err => {
            console.log(err)
        })
    }

    _isFavorite() {
        isFavorite('1537257839638').then(res => {
            alert(res)
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