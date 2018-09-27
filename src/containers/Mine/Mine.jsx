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
import {getFavoriteSize, getPlayerMsg, getPlayerMsgSize} from "../../contract/utils/UserInfoUtils"
import SignIn from "../SignIn"
import {CommonStyles} from "../../components/Styles"
import MsgItem from "../MsgItem";

const everyPage = 5
export default class Mine extends React.Component {

    constructor() {
        super();
        this.state = {
            player: {name: 'name', icon: '', sex: true},
            loading: true,
            msgSize: '0',
            favoriteSize: '0',
            isSignIn: 0,
            msgList: [],
            index: 1,
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
        this._load()
        getFavoriteSize(window.neuron.getAccount()).then(size => {
            console.log(size)
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
                    <div style={Styles.Container}>
                        <UserInfo player={this.state.player}
                                  style={Styles.UserInfo}
                                  reLoad={() => {
                                      checkPlayer(window.neuron.getAccount())
                                          .then(player => {
                                              this.setState({player: player, loading: false, isSignIn: 1})
                                          })
                                          .catch(err => {
                                              this.setState({loading: false, isSignIn: 2})
                                          })
                                  }}/>
                        <PartingLine/>
                        <ItemInfo name={'我的帖子'} value={this.state.msgSize} icon={IconBBSMsgs}/>
                        <ItemInfo name={'我的收藏'} value={this.state.favoriteSize} icon={IconBBSFavorite}/>
                        <div style={{marginTop: 10}}>
                            <PartingLine/>
                        </div>
                        {this.state.msgList.map(data => (
                            <MsgItem data={data} onClick={() => this.props.history.push('/msg/' + data.id)}
                                     reload={() => this._load()}
                                     loading={(isShow) => this.setState({loading: isShow})}/>))}
                        {this._renderLoadMore()}
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

    _renderMsgList() {
        let index = 0
        if (this.state.msgSize <= everyPage) {
            index = this.state.msgSize;
        } else {
            index = this.state.msgSize - (this.state.index - 1) * everyPage
        }
        for (let i = index; index - i < 5 && i > 0; i--) {
            console.log(i - 1)
            getPlayerMsg(i - 1).then(res => {
                console.log(res)
                if (res != 0) {
                    let list = this.state.msgList;
                    let data = {id: res, index: i - 1}
                    list.push(data)
                    this.setState({msgList: list})
                }
            }).catch(err => console.log(err))
        }
    }

    _renderLoadMore() {
        if (this.state.index * everyPage >= this.state.msgSize) {
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

    _load() {
        this.setState({msgList: [], loading: true, index: 1}, () => {
            getPlayerMsgSize(window.neuron.getAccount()).then(size => {
                this.setState({msgSize: size}, () => {
                    this._renderMsgList()
                    this.setState({loading: false})
                })
            }).catch(err => {
                this.setState({loading: false})
                alert("发生异常，请刷新重试")
            })
        })
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
    },
    LoadButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    }
}