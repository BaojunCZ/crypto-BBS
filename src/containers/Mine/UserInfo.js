/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import headIcon from "../../public/image/icon.png"
import {setIcon, setName, setSynopsis} from "../../contract/utils/UserInfoUtils";
import IconDialog from "../../components/Dialog/IconDialog";
import SetNameDialog from "../../components/Dialog/SetNameDialog"
import SetSynopsisDialog from "../../components/Dialog/SetSynopsisDialog";

export default class UserInfo extends React.Component {

    constructor() {
        super()
        this.state = {
            src: headIcon,
            iconDisplay: 'none',
            nameDisplay: 'none',
            synopsisDisplay: 'none'
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
                         this.setState({iconDisplay: 'block'})
                     }}/>
                <text
                    style={Styles.Name}
                    onClick={() => {
                        this.setState({nameDisplay: 'block'})
                    }}>
                    {this.props.player.sex ? this.props.player.name + ' ♂' : this.props.player.name + ' ♀'}</text>
                <text style={Styles.Address}>{this.props.player.playerAddress}</text>
                <text style={Styles.Address}
                      onClick={() => {
                          this.setState({synopsisDisplay: 'block'})
                      }}>{this.props.player.synopsis}</text>
                <IconDialog display={this.state.iconDisplay}
                            select={(icon => {
                                this.setState({iconDisplay: 'none', src: icon})
                                setIcon(icon).then(res => {
                                }).catch(err => console.log(err))
                            })}
                            close={() => this.setState({iconDisplay: 'none'})}/>
                <SetNameDialog display={this.state.nameDisplay}
                               close={() => this.setState({nameDisplay: 'none'})}
                               setName={(name) => this._setName(name)}
                               title={'昵称'}/>
                <SetSynopsisDialog display={this.state.synopsisDisplay}
                                   close={() => this.setState({synopsisDisplay: 'none'})}
                                   setSynopsis={(synopsis) => this._setSynopsis(synopsis)}
                                   title={'简介'}/>
            </div>
        )
    }

    _setName(name) {
        if (name !== '' && name.length <= 10) {
            this.setState({nameDisplay: 'none'})
            this.props.loading(true)
            setName(name).then(res => {
                this.props.reLoad()
            }).catch(err => {
                alert(JSON.stringify(err))
                this.props.loading(false)
            })
        }
    }

    _setSynopsis(synopsis) {
        if (synopsis !== null && synopsis.length <= 20) {
            this.setState({synopsisDisplay: 'none'})
            this.props.loading(true)
            setSynopsis(synopsis).then(res => {
                this.props.reLoad()
            }).catch(err => {
                console.log(err)
                alert(JSON.stringify(err))
                this.props.loading(false)
            })
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
