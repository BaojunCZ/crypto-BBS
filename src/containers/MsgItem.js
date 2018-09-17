/**
 * Created by 包俊 on 2018/9/14.
 */
import React from 'react';
import {getMsg} from "../contract/utils/MsgUtils"
import headIcon from "../public/image/ic_default_head.png";
import {getPlayer} from "../contract/utils/UserInfoUtils";
import iconLike from "../public/image/icon_like.png";
import iconDiscuss from "../public/image/icon_discuss.png"


export default class MsgItem extends React.Component {
    constructor() {
        super()
        this.state = {
            imgUrl: '',
            info: '',
            likeCount: '',
            writer: '',
            id: '',
            icon: headIcon,
        }
    }

    componentDidMount() {
        getMsg(this.props.id).then(res => {
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
    }

    render() {
        return (
            <div style={Styles.FirstContainer}>
                <div style={Styles.SecondContainer}>
                    <img alt={'head'}
                         src={this.state.icon}
                         style={Styles.Head}
                         onError={() => this.setState({icon: headIcon})}/>
                    <div style={Styles.MsgContainer}>
                        <div>
                            {this._renderImage()}
                        </div>
                        {this._renderInfo()}
                    </div>
                </div>
                <div style={Styles.Line}/>
                <div style={Styles.LikeDiscuss}>
                    <div style={Styles.LikeContainer}>
                        <img
                            alt={'like'}
                            src={iconLike}
                            style={Styles.LikeIcon}/>
                        <text style={Styles.LikeText}>赞</text>
                    </div>
                    <div style={Styles.DiscussContainer}>
                        <img
                            alt={'discuss'}
                            src={iconDiscuss}
                            style={Styles.LikeIcon}/>
                        <text style={Styles.LikeText}>评论</text>
                    </div>
                </div>
            </div>
        )
    }

    _renderIcon() {
        if (this.state.writer !== '') {
            let address = this.state.writer
            getPlayer(address).then((player) => {
                console.log(player)
                if (player.playerAddress.toLowerCase() === address.toLowerCase()) {
                    this.setState({icon: player.icon})
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
}

const Styles = {
    FirstContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },
    SecondContainer: {
        marginTop: 20,
        display: 'flex',
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
        marginTop: 10
    },
    LikeDiscuss: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 60,
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
    DiscussContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20
    },
}