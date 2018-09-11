import React from 'react'
import BottomTabs from '../../components/BottomTabs'
import {address1, address2} from '../../contract/test.config'
import BBSInfo from './BBSInfo'
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import {getBBSInfo} from "../../contract/utils/BBSInfoUtils"
import IconBBSPlayer from "../../public/image/icon_bbs_player.png"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png"

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            playerCount: '',
            msgCount: '',
        }
    }

    componentDidMount() {
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
                <PartingLine/>
                <BottomTabs select={2}/>
            </div>
        )
    }

}

const Styles = {}