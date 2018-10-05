/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import headIcon from "../../public/image/icon.png"
import {setName, setSynopsis, setIcon} from "../../contract/utils/UserInfoUtils";
import {aviationIcons, fruitIcons, marineIcons, musicIcons} from "../../components/Icons";

export default class UserInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            src: headIcon
        }
    }

    componentWillReceiveProps(nextProps) {
        this._initAttrs(nextProps);
    }

    componentDidMount() {
        this._initAttrs(this.props);
    }

    _initAttrs(props) {
        console.log(props.player)
        this.setState({src: props.player.icon});
    }

    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'head'}
                     src={this.state.src}
                     style={Styles.Head}
                     onError={() => this._renderIcon()}
                     onClick={() => {
                         let info = prompt("请输入图片地址")
                         if (info !== '' && info.length > 0) {
                             setIcon(info).then(res => {
                                 this.props.reLoad()
                             }).catch(err => console.log(err))
                         }
                     }}/>
                <text
                    style={Styles.Name}
                    onClick={() => {
                        let info = prompt("请输入昵称")
                        if (info !== '' && info.length <= 10) {
                            setName(info).then(res => {
                                this.props.reLoad()
                            }).catch(err => console.log(err))
                        }
                    }}>
                    {this.props.player.sex ? this.props.player.name + ' ♂' : this.props.player.name + ' ♀'}</text>
                <text style={Styles.Address}>{this.props.player.playerAddress}</text>
                <text style={Styles.Address}
                      onClick={() => {
                          let info = prompt("请输入简介")
                          if (info !== '' && info.length <= 20) {
                              setSynopsis(info).then(res => {
                                  this.props.reLoad()
                              }).catch(err => console.log(err))
                          }
                      }}>{this.props.player.synopsis}</text>
            </div>
        )
    }

    _renderIcon() {
        alert(this.state.headPortrait)
        if (this.state.headPortrait === '' || this.state.headPortrait === undefined) {
            return headIcon
        } else if (JSON.parse(this.state.headPortrait).name !== undefined) {
            let head = JSON.parse(this.state.headPortrait)
            switch (head.name) {
                case 'fruit':
                    return fruitIcons[head.index]
                    break
                case 'aviation':
                    return aviationIcons[head.index]
                    break
                case 'marine':
                    return marineIcons[head.index]
                    break
                case 'music':
                    return musicIcons[head.index]
                    break
            }
        } else {
            return this.state.headPortrait
        }
    }
}

const Styles = {
    Container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#456cff',
        width: '100vw',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    Head: {
        width: 60,
        height: 60,
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid #ffffff',
    },
    Name: {
        fontSize: 18,
        marginTop: 7,
        color: '#ffffff'
    },
    Address: {
        fontSize: 13,
        marginTop: 3,
        color: '#ffffff'
    }
}
