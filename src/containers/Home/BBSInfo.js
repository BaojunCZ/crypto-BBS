/**
 * Created by 包俊 on 2018/9/9.
 */
import React from 'react'
import headIcon from "../../public/image/icon_default.jpg";
import {getBBSInfo, setBBSLogo, setBBSName, setBBSSynopsis} from "../../contract/utils/BBSInfoUtils"

export default class BBSInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            src: headIcon,
            name: 'BBS',
            synopsis: '',

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
    }

    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'head'}
                     src={this.state.src}
                     style={Styles.Head}
                     onError={() => this.setState({src: headIcon})}
                     onClick={() => {
                         let info = prompt("请输入图片地址")
                         if (info !== '') {
                             setBBSLogo(info).then(res => {
                                 getBBSInfo('BBSLogo').then(src => {
                                     this.setState({src: src})
                                 })
                             }).catch(err => console.log(err))
                         }
                     }}/>
                <text
                    style={Styles.Name}
                    onClick={() => {
                        let info = prompt("请输入社区名称")
                        if (info !== '' && info.length <= 10) {
                            setBBSName(info).then(res => {
                                console.log(res)
                                getBBSInfo('BBSName').then(name => {
                                    this.setState({name: name})
                                    document.title = name
                                })
                            }).catch(err => console.log(err))
                        }
                    }}>{this.state.name}</text>
                <text style={Styles.Address}>{window.BBSAddress}</text>
                <text style={Styles.Synopsis}
                      onClick={() => {
                          let info = prompt("请输入社区简介")
                          if (info !== '' && info.length <= 20) {
                              setBBSSynopsis(info).then(res => {
                                  console.log(res)
                                  getBBSInfo('BBSSynopsis').then(synopsis => {
                                      this.setState({synopsis: synopsis})
                                  })
                              }).catch(err => console.log(err))
                          }
                      }}>{this.state.synopsis}
                </text>
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
