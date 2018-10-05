/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import headIcon from "../../public/image/icon.png"
import {setIcon, setName, setSynopsis} from "../../contract/utils/UserInfoUtils";
import IconDialog from "../../components/Dialog/IconDialog";

export default class UserInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            src: headIcon,
            display: 'none'
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
                     onError={() => headIcon}
                     onClick={() => {
                         this.setState({display: 'block'})
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
                <IconDialog display={this.state.display}
                            select={(icon => {
                                this.setState({display: 'none', src: icon})
                                setIcon(icon).then(res => {
                                }).catch(err => console.log(err))
                            })}
                            close={() => this.setState({display: 'none'})}/>
            </div>
        )
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
