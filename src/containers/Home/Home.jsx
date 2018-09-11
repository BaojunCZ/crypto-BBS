import React from 'react'
import BBSInfo from './BBSInfo'
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import {getBBSInfo} from "../../contract/utils/BBSInfoUtils"
import IconBBSPlayer from "../../public/image/icon_bbs_player.png"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png"
import IconSendMsg from "../../public/image/ic_button_sendmsg.png"

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            playerCount: '',
            msgCount: '',
        }
    }

    componentDidMount() {
        document.title = "Crypto-BBS"
        getBBSInfo('playerCount').then(playerCount => {
            this.setState({playerCount: playerCount})
        })
        getBBSInfo('msgCount').then(msgCount => {
            this.setState({msgCount: msgCount})
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <BBSInfo/>
                <PartingLine/>
                <ItemInfo name={'注册人数'} value={this.state.playerCount} icon={IconBBSPlayer}/>
                <ItemInfo name={'帖子总数'} value={this.state.msgCount} icon={IconBBSMsgs}/>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                <img
                    alt={'add'}
                    src={IconSendMsg}
                    style={Styles.SendMsgButton}
                    onClick={() => this.props.history.push("/write_msg")}/>
            </div>
        )
    }

}

const Styles = {
    SendMsgButton: {
        width: 40,
        height: 40,
        position: 'fixed',
        bottom: 80,
        right: 20
    }
}