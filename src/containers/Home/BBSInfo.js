/**
 * Created by 包俊 on 2018/9/9.
 */
import React from 'react'
import headIcon from "../../public/image/ic_default_head.png";
import {getBBSInfo} from "../../contract/utils/BBSInfoUtils"

export default class BBSInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            src: headIcon,
            name: 'BBS',
            describe: '',
        }
    }

    componentDidMount() {
        getBBSInfo('BBSName').then(name => {
            this.setState({name: name})
        })
        getBBSInfo('BBSDescribe').then(describe => {
            this.setState({describe: describe})
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
                     onError={() => this.setState({src: headIcon})}/>
                <text
                    style={Styles.Name}>{this.state.name}</text>
                <text style={Styles.Describe}>{this.state.describe}</text>
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
    Describe: {
        fontSize: 12,
        color: '#ffffff',
        marginTop: '10px',
        marginLeft: '20px',
        marginRight: '20px',
    }
}
