/**
 * Created by 包俊 on 2018/9/18.
 */
import React from 'react'
import headIcon from "../public/image/ic_default_head.png";
import {
    favorite,
    getDiscussMsgLength,
    getLikeCount,
    getMsg,
    isFavorite,
    discussMsg,
    getDiscussMsg, sendMsg
} from "../contract/utils/MsgUtils";
import iconDiscuss from "../public/image/icon_discuss.png";
import {getPlayer} from "../contract/utils/UserInfoUtils";
import iconLiked from "../public/image/icon_liked.png";
import iconUnLike from "../public/image/icon_like.png";
import Title from "../components/Title";
import {CommonStyles} from "../components/Styles";
import DiscussInfo from "./DiscussInfo"
import {checkPlayer} from "../utils/CheckPlayer";
import Loading from "react-loading-animation"

export default class MsgDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            imgUrl: '',
            info: '',
            likeCount: '',
            writer: '',
            writerName: 'somebody',
            id: '',
            icon: headIcon,
            favoriteCount: 0,
            discussCount: 0,
            isFavorite: 0,
            discussInfo: '',
            discussInfos: [],
            loading: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({id: id})
        getMsg(id).then(res => {
            this.setState({
                imgUrl: res.imgUrl,
                info: res.info,
                likeCount: res.likeCount,
                writer: res.writer,
                id: res.id
            }, () => {
                this._renderIcon()
            })
        }).catch(err => console.log(err))

        getLikeCount(id).then(res => {
            this.setState({favoriteCount: res})
        }).catch(err => console.log(err))

        isFavorite(id).then(res => {
            this.setState({isFavorite: res})
        }).catch(err => console.log(err))

        this._renderDiscussInfo(id)
    }

    render() {
        return (
            <div style={Styles.FirstContainer}>
                <Title title={'帖子'}
                       leftShow={true}
                       leftClick={() => {
                           this.props.history.goBack();
                       }}/>
                <div style={Styles.SecondContainer}>
                    <img alt={'head'}
                         src={this.state.icon}
                         style={Styles.Head}
                         onError={() => this.setState({icon: headIcon})}/>
                    <div style={Styles.MsgContainer}>
                        <text style={Styles.WriterName}>{this.state.writerName}</text>
                        <div>
                            {this._renderImage()}
                        </div>
                        {this._renderInfo()}
                    </div>
                </div>
                <div style={Styles.Line}/>
                <div style={Styles.LikeDiscuss}>
                    <div style={Styles.LikeContainer} onClick={() => this._favorite()}>
                        <img
                            alt={'like'}
                            src={this._renderFavorite()}
                            style={Styles.LikeIcon}/>
                        <text style={Styles.LikeText}>收藏</text>
                        <text style={Styles.LikeCount}>{this.state.favoriteCount}</text>
                    </div>
                    <div style={Styles.DiscussContainer}>
                        <img
                            alt={'discuss'}
                            src={iconDiscuss}
                            style={Styles.LikeIcon}/>
                        <text style={Styles.LikeText}>评论</text>
                        <text style={Styles.LikeCount}>{this.state.discussCount}</text>
                    </div>
                </div>
                {this.state.discussInfos.map(info => (<DiscussInfo info={info}/>))}
                <div style={Styles.BottomLine}/>
                <textarea onChange={(e) => this.setState({discussInfo: e.target.value})}
                          style={Styles.TextAreaDiscuss}/>
                <div style={Styles.LoadButton}>
                    <text onClick={() => this._discuss()} style={CommonStyles.ButtonClickAble}>评论</text>
                </div>
                {this._loading()}
            </div>
        )
    }

    _renderIcon() {
        if (this.state.writer !== '') {
            let address = this.state.writer
            getPlayer(address).then((player) => {
                if (player.playerAddress.toLowerCase() === address.toLowerCase()) {
                    this.setState({icon: player.icon, writerName: player.name})
                }
            }).catch(err => console.log(err))
        }
    }

    _renderImage() {
        if (this.state.imgUrl !== '') {
            return (
                <img alt={"img"}
                     src={this.state.imgUrl}
                     style={Styles.Image}
                     onError={() => this.setState({imgUrl: ''})}/>
            )
        } else {
            return null
        }
    }

    _renderInfo() {
        if (this.state.info !== '') {
            return (<text style={Styles.Info}>{this.state.info}</text>)
        } else {
            return null;
        }
    }

    _renderFavorite() {
        if (this.state.isFavorite == 1) {
            return iconLiked;
        } else {
            return iconUnLike;
        }
    }

    _renderDiscussInfo(id) {
        getDiscussMsgLength(id).then(res => {
            this.setState({discussCount: res}, () => {
                this.setState({loading: false})
                let list = this.state.discussInfos
                let i = this.state.discussInfos.length
                for (i; i < this.state.discussCount; i++) {
                    getDiscussMsg(id, i).then(res => {
                        list.push(res)
                        this.setState({discussInfos: list})
                    }).catch(err => console.log(err))
                }
            })
        }).catch(err => console.log(err))

    }

    _favorite() {
        checkPlayer(window.neuron.getAccount())
            .then(player => {
                if (this.state.isFavorite == 0) {
                    favorite(this.state.id).then(res => {
                        this.setState({isFavorite: 1})
                        getLikeCount(this.state.id).then(res => {
                            this.setState({favoriteCount: res})
                        }).catch(err => console.log(err))
                    }).catch(err => alert(err))
                }
            })
            .catch(err => {
                if (err == '未注册')
                    alert("请先注册，否则只能查看，无法评论与收藏")
            })
    }

    _discuss() {
        checkPlayer(window.neuron.getAccount())
            .then(player => {
                if (this.state.discussInfo !== '') {
                    this.setState({loading: true})
                    discussMsg(this.state.id, this.state.discussInfo, this.state.writer).then(res => {
                        getDiscussMsgLength(this.state.id).then(res => {
                            this.setState({discussCount: res})
                        }).catch(err => console.log(err))
                        this._renderDiscussInfo(this.state.id)
                    }).catch(err => alert(err))
                }
            })
            .catch(err => {
                if (err == '未注册')
                    alert("请先注册，否则只能查看，无法评论与收藏")
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
    FirstContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1'
    },
    SecondContainer: {
        marginTop: 20,
        display: 'flex',
        marginLeft: 20,
    }, Head: {
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
    },
    MsgContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },
    WriterName: {
        fontSize: 18,
        color: '#456cff',
        marginBottom: 10,
        marginTop: 5,
    },
    Image: {
        width: 150,
        marginBottom: 10
    },
    Info: {
        marginBottom: 10,
        fontSize: 15,
    },
    Line: {
        background: '#f7f7f7',
        height: 2,
        marginTop: 5,
        marginLeft: 80,
    },
    LikeDiscuss: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 80,
        marginTop: 10
    },
    LikeContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    LikeIcon: {
        width: 30,
        height: 30
    },
    LikeText: {
        fontSize: 13
    },
    LikeCount: {
        fontSize: 13,
        marginLeft: 5
    },
    DiscussContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20
    },
    BottomLine: {
        background: '#E9EBF0',
        height: 5,
        marginTop: 5,
    },
    LoadButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    },
    TextAreaDiscuss: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    }
}