/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import {checkPlayer} from "../../utils/CheckPlayer";
import Loading from "react-loading-animation"
import UserInfo from "./UserInfo"
import PartingLine from "../../components/PartingLine"
import ItemInfo from "../../components/ItemInfo"
import IconBBSMsgs from "../../public/image/icon_bbs_msgs.png";
import IconBBSFavorite from "../../public/image/icon_bbs_favorite.png"
import {getPlayerMsgSize, getFavoriteSize} from "../../contract/utils/UserInfoUtils"
import SignIn from "../SignIn"
import {CommonStyles} from "../../components/Styles"

export default class Mine extends React.Component {

    constructor() {
        super();
        this.state = {
            player: {name: 'name', icon: '', sex: true},
            loading: true,
            msgSize: '0',
            favoriteSize: '0',
            isSignIn: 0,
        }
    }

    componentDidMount() {
        document.title = "我的"
        checkPlayer(window.neuron.getAccount())
            .then(player => {
                this.setState({player: player, loading: false, isSignIn: 1})
            })
            .catch(err => {
                this.setState({loading: false, isSignIn: 2})
            })
        getPlayerMsgSize(window.neuron.getAccount()).then(size => {
            this.setState({msgSize: size})
        }).catch(err => console.log(err))
        getFavoriteSize(window.neuron.getAccount()).then(size => {
            alert(size)
            this.setState({favoriteSize: size})
        }).catch(err => console.log(err))
    }

    render() {
        switch (this.state.isSignIn) {
            case 0:
                return <Loading style={CommonStyles.Loading}/>
                break
            case 1:
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
                        {this._loading()}
                    </div>
                )
                break
            case 2:
                return (
                    <SignIn history={this.props.history}/>
                )
                break
        }
    }

    _loading() {
        if (this.state.loading)
            return (<Loading style={CommonStyles.Loading}/>)
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