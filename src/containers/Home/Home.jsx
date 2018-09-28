import React from 'react'
import BBSInfo from './BBSInfo'
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import {getBBSInfo} from "../../contract/utils/BBSInfoUtils"
import IconBBSPlayer from "../../public/image/icon_bbs_player.png"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png"
import IconSendMsg from "../../public/image/ic_button_sendmsg.png"
import {getMsg, getMsgID, getMsgIDs} from "../../contract/utils/MsgUtils"
import MsgItem from "../../containers/MsgItem"
import {CommonStyles} from "../../components/Styles";
import {checkPlayer} from "../../utils/CheckPlayer";

const everyPage = 5
export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            playerCount: '',
            msgCount: '',
            msgList: [],
            index: 1,
            describe: ''
        }
    }

    componentDidMount() {
        document.title = "芒果"
        getBBSInfo('playerCount').then(playerCount => {
            this.setState({playerCount: playerCount})
        })
        getBBSInfo('msgCount').then(msgCount => {
            this.setState({msgCount: msgCount}, () => {
                this._renderMsgList()
            })
        }).catch(err => console.log(err))
        getBBSInfo('BBSDescribe').then(describe => {
            this.setState({describe: describe})
        }).catch(err => console.log(err))
        checkPlayer(window.neuron.getAccount())
            .then()
            .catch(err => {
                if (err == '未注册')
                    alert("请先注册，否则只能查看，无法发帖，评论与收藏")
            })
    }

    render() {
        return (
            <div style={{overflow: 'auto', overflowX: 'auto'}}>
                <BBSInfo history={this.props.history}/>
                <PartingLine/>
                <ItemInfo name={'注册人数'} value={this.state.playerCount} icon={IconBBSPlayer}/>
                <ItemInfo name={'帖子总数'} value={this.state.msgCount} icon={IconBBSMsgs}/>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                <div style={Styles.BoardContainer}>
                    <text>公告:</text>
                    <text style={Styles.BoardText}>{this.state.describe}</text>
                </div>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                {this.state.msgList.map(data => (
                    <MsgItem data={data} onClick={() => this.props.history.push('/msg/' + data.id)}/>))}
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
        let index = 0
        if (this.state.msgCount <= everyPage) {
            index = this.state.msgCount;
        } else {
            index = this.state.msgCount - (this.state.index - 1) * everyPage
        }
        console.log("index>>>" + index)
        getMsgIDs(index).then(res => {
            let list = []
            if (this.state.msgCount > everyPage) {
                list = this.state.msgList;
            }
            for (let i = 0; i < 5; i++) {
                if (res[i] != 0) {
                    let data = {id: res[i], index: -1}
                    list.push(data)
                }
            }
            console.log(list)
            this.setState({msgList: list}, () => {
                console.log(this.state.msgList)
            })
        }).catch(err => console.log(err))
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
    },
    BoardContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    BoardText: {
        fontSize: 14,
    }
}