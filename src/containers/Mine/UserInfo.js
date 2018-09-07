/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import headIcon from "../../public/image/ic_default_head.png"

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
        this.setState({src: props.player.icon}, () => {
            console.log(this.state.src)
        });
    }

    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'head'}
                     src={this.state.src}
                     style={Styles.Head}
                     onError={() => this.setState({src: headIcon})}/>
                <text style={Styles.Name}>{this.props.player.name}</text>
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
        height: '40vw'
    },
    Head: {
        width: 70,
        height: 70,
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
    }
}
