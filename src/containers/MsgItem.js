/**
 * Created by 包俊 on 2018/9/14.
 */
import React from 'react';
import {getMsg, getLikeCount, getDiscussMsgLength, isFavorite, favorite, unFavorite} from "../contract/utils/MsgUtils"
import headIcon from "../public/image/icon.png";
import {getPlayer} from "../contract/utils/UserInfoUtils";
import iconUnLike from "../public/image/icon_like.png";
import iconLiked from "../public/image/icon_liked.png";
import iconDiscuss from "../public/image/icon_discuss.png"


export default class MsgItem extends React.Component {
    constructor() {
        super()
        this.state = {
            imgUrl: '',
            info: '',
            url: '',
            likeCount: '',
            writer: '',
            writerName: 'somebody',
            id: '',
            icon: headIcon,
            favoriteCount: 0,
            discussCount: 0,
            isFavorite: false,
        }
    }

    componentDidMount() {
        getMsg(this.props.data.id).then(res => {
            this.setState({
                imgUrl: res.imgUrl,
                info: res.info,
                url: res.url,
                likeCount: res.likeCount,
                writer: res.writer,
                id: res.id
            }, () => {
                this._renderIcon()
            })
        }).catch(err => console.log(err))

        getLikeCount(this.props.data.id).then(res => {
            this.setState({favoriteCount: res})
        }).catch(err => console.log(err))

        getDiscussMsgLength(this.props.data.id).then(res => {
            this.setState({discussCount: res})
        }).catch(err => console.log(err))

        isFavorite(this.props.data.id).then(res => {
            this.setState({isFavorite: res})
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div style={Styles.FirstContainer}>
                <div style={Styles.SecondContainer} onClick={() => this.props.onClick()}>
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
                <div style={Styles.BottomLine}/>
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
                     onError={() => this.setState({imgUrl: ''})}
                     onClick={() => this._link()}/>
            )
        } else {
            return null
        }
    }

    _renderInfo() {
        if (this.state.info !== '') {
            return (<text style={this.state.url === '' ? Styles.Info : Styles.InfoLink}
                          onClick={() => this._link()}>{this.state.info}</text>)
        } else {
            return null;
        }
    }

    _link() {
        if (this.state.url !== '') {
            window.location.href = this.state.url
        }
    }

    _renderFavorite() {
        if (this.state.isFavorite) {
            return iconLiked;
        } else {
            return iconUnLike;
        }
    }

    _favorite() {
        if (!this.state.isFavorite) {
            favorite(this.props.data.id).then(res => {
                this.setState({isFavorite: true})
                getLikeCount(this.props.data.id).then(res => {
                    this.setState({favoriteCount: res})
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        } else {
            if (this.props.data.index !== -1) {
                this.props.loading(true)
                unFavorite(this.props.data.index, this.props.data.id).then(res => {
                    this.props.reload()
                }).catch(err => {
                    this.props.loading(false)
                    console.log(err)
                })
            }
        }
    }

}

const Styles = {
    FirstContainer: {
        display: 'flex',
        flexDirection: 'column',
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
    InfoLink: {
        marginBottom: 10,
        fontSize: 15,
        color: '#456fff',
        textDecoration: 'underline',
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
    }
}