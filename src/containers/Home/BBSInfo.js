/**
 * Created by 包俊 on 2018/9/9.
 */
import React from 'react'
import headIcon from "../../public/image/icon_default.jpg";
import {getBBSInfo, setBBSLogo, setBBSName, setBBSSynopsis} from "../../contract/utils/BBSInfoUtils"
import SetNameDialog from "../../components/Dialog/SetNameDialog";
import SetSynopsisDialog from "../../components/Dialog/SetSynopsisDialog"
import {setIcon} from "../../contract/utils/UserInfoUtils";
import IconDialog from "../../components/Dialog/IconDialog";

export default class BBSInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            src: headIcon,
            name: 'BBS',
            synopsis: '',
            Owner: '',
            iconDisplay: 'none',
            nameDisplay: 'none',
            synopsisDisplay: 'none'
        }
    }

    componentDidMount() {
        getBBSInfo('BBSName').then(name => {
            this.setState({name: name})
            document.title = name
        })
        getBBSInfo('BBSSynopsis').then(synopsis => {
            this.setState({synopsis: synopsis})
        })
        getBBSInfo('BBSLogo').then(src => {
            this.setState({src: src})
        })
        getBBSInfo('playerCount').then(playerCount => {
            this.setState({playerCount: playerCount})
        })
        getBBSInfo('Owner').then(owner => {
            this.setState({Owner: owner})
        })
    }

    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'head'}
                     src={this.state.src}
                     style={Styles.Head}
                     onError={() => this.setState({src: headIcon})}
                     onClick={() => {
                         if (this._isOwner()) {
                             this.setState({iconDisplay: 'block'})
                         }
                     }}/>
                <text
                    style={Styles.Name}
                    onClick={() => {
                        if (this._isOwner()) {
                            this.setState({nameDisplay: 'block'})
                        }
                    }}>{this.state.name}</text>
                <text style={Styles.Address}>{window.BBSAddress}</text>
                <text style={Styles.Synopsis}
                      onClick={() => {
                          if (this._isOwner()) {
                              this.setState({synopsisDisplay: 'block'})
                          }
                      }}>{this.state.synopsis}
                </text>
                <IconDialog display={this.state.iconDisplay}
                            select={(icon => {
                                this.setState({iconDisplay: 'none', src: icon})
                                setBBSLogo(icon).then(res => {
                                }).catch(err => console.log(err))
                            })}
                            close={() => this.setState({iconDisplay: 'none'})}/>
                <SetNameDialog display={this.state.nameDisplay}
                               close={() => this.setState({nameDisplay: 'none'})}
                               setName={(name) => this._setName(name)}
                               title={'社区名'}/>
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
            setBBSName(name).then(res => {
                console.log(res)
                getBBSInfo('BBSName').then(name => {
                    this.setState({name: name})
                    document.title = name
                })
            }).catch(err => console.log(err))
        }
    }

    _setSynopsis(synopsis) {
        if (synopsis !== '' && synopsis.length <= 20) {
            this.setState({synopsisDisplay: 'none'})
            setBBSSynopsis(synopsis).then(res => {
                console.log(res)
                getBBSInfo('BBSSynopsis').then(synopsis => {
                    this.setState({synopsis: synopsis})
                })
            }).catch(err => console.log(err))
        }
    }

    _isOwner() {
        return window.neuron.getAccount() === this.state.Owner
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
    NameContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#ffffff',
    },
    Address: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: '5px',
        marginLeft: '20px',
        marginRight: '20px',
    },
    Synopsis: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: '5px',
        marginLeft: '20px',
        marginRight: '20px',
    }
}
