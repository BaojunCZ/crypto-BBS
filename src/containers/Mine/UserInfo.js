/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import headIcon from "../../public/image/ic_default_head.png"

export default class UserInfo extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'head'}
                     src={headIcon}
                     style={Styles.Head}/>
                <text style={Styles.Name}>{this.props.name}</text>
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
