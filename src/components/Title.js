/**
 * Created by 包俊 on 2018/9/11.
 */
import React from 'react'
import back from '../public/image/icon_back.png'

export default class Title extends React.Component {
    render() {
        return (
            <div style={Styles.Container}>
                <img alt={'back'}
                     src={back}
                     style={this.props.leftShow ? Styles.Image : Styles.ImageGone}
                     onClick={() => this.props.leftClick()}/>
                <text style={Styles.TitleText}>{this.props.title}</text>
            </div>
        )
    }

}

const Styles = {
    Container: {
        display: 'flex',
        width: '100vw',
        alignItems: 'center',
        height: 50,
        background: '#456fff'
    },
    Image: {
        width: 25,
        height: 25,
        marginLeft: 20
    },
    ImageGone: {
        width: 0,
        height: 0,
    },
    TitleText: {
        fontSize: 22,
        color: '#ffffff',
        marginLeft: 13,
    }
}