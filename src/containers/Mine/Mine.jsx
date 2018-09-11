/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import {checkPlayer} from "../../utils/CheckPlayer";
import BottomTabs from '../../components/BottomTabs'
import {address1, address2} from "../../contract/test.config";
import Loading from "react-loading-animation"
import UserInfo from "./UserInfo"
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png";
import IconBBSFavorite from "../../public/image/icon_bbs_favorite.png"
import {getPlayerMsgSize, getFavoriteSize} from "../../contract/utils/UserInfoUtils"


export default class Mine extends React.Component {

    constructor() {
        super();
        this.state = {
            player: {name: 'name', icon: '', sex: true},
            loading: true,
            msgSize: '0',
            favoriteSize: '0',
        }
    }

    componentDidMount() {
        checkPlayer(address1)
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
        getPlayerMsgSize(address1).then(size => {
            this.setState({msgSize: size})
        })
        getFavoriteSize(address1).then(size => {
            this.setState({favoriteSize: size})
        })
    }

    render() {
        return (
            <div>
                <div style={Styles.Container}>
                    <UserInfo player={this.state.player}
                              style={Styles.UserInfo}/>
                    <PartingLine/>
                    <ItemInfo name={'我的帖子'} value={this.state.msgSize} icon={IconBBSMsgs}/>
                    <ItemInfo name={'我的收藏'} value={this.state.favoriteSize} icon={IconBBSFavorite}/>
                    <div style={{marginTop: 10}}>
                        <PartingLine/>
                    </div>
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
        flexDirection: 'column',

    },
    UserInfo: {
        marginTop: 30,
    }
}