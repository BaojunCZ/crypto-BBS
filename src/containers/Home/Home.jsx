import React from 'react'
import BBSInfo from './BBSInfo'
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import {getBBSInfo} from "../../contract/utils/BBSInfoUtils"
import IconBBSPlayer from "../../public/image/icon_bbs_player.png"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png"
import IconSendMsg from "../../public/image/ic_button_sendmsg.png"
import {getMsg, getMsgID} from "../../contract/utils/MsgUtils"
import MsgItem from "../../containers/MsgItem"
import {CommonStyles} from "../../components/Styles";

const everyPage = 10
let lastPage = 0
export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            playerCount: '',
            msgCount: '',
            msgList: [],
            index: 1,
        }
    }

    componentDidMount() {
        document.title = "Crypto-BBS"
        getBBSInfo('playerCount').then(playerCount => {
            this.setState({playerCount: playerCount})
        })
        getBBSInfo('msgCount').then(msgCount => {
            this.setState({msgCount: msgCount})
            lastPage = Math.ceil(msgCount / everyPage)
        }).catch(err => console.log(err))
        this._renderMsgList()
    }

    render() {
        return (
            <div style={{overflow: 'auto', overflowX: 'auto'}}>
                <BBSInfo/>
                <PartingLine/>
                <ItemInfo name={'注册人数'} value={this.state.playerCount} icon={IconBBSPlayer}/>
                <ItemInfo name={'帖子总数'} value={this.state.msgCount} icon={IconBBSMsgs}/>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                {this.state.msgList.map(id => (
                    <MsgItem id={id} onClick={() => this.props.history.push('/msg/' + id)}/>))}
                {this._renderLoadMore()}
                <img
                    alt={'add'}
                    src={IconSendMsg}
                    style={Styles.SendMsgButton}
                    onClick={() => this.props.history.push("/write_msg")}/>
            </div>
        )
    }

    _renderMsgList() {
        let list = []
        for (let i = (this.state.index - 1) * everyPage; i < this.state.index * everyPage; i++) {
            getMsgID(i).then(id => {
                if (id !== 0) {
                    list = this.state.msgList;
                    list.push(id)
                    this.setState({msgList: list})
                }
            }).catch(err => console.log(err))
        }
        return list
    }

    _renderLoadMore() {
        if (this.state.index * everyPage > this.state.msgCount) {
            return (
                <div style={Styles.LoadButton}>
                    <text style={CommonStyles.ButtonUnClickAble}>无更多内容</text>
                </div>
            )
        } else {
            return (
                <div style={Styles.LoadButton}>
                    <text onClick={() => this._loadMore()} style={CommonStyles.ButtonClickAble}>加载更多</text>
                </div>
            )
        }
    }

    _loadMore() {
        this.setState({index: this.state.index + 1}, () => {
            this._renderMsgList()
        })
    }

}

const Styles = {
    SendMsgButton: {
        width: 40,
        height: 40,
        position: 'fixed',
        bottom: 80,
        right: 20
    },
    LoadButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    }
}