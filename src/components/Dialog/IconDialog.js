/**
 * Created by 包俊 on 2018/10/3.
 */
import React from 'react';
import {aviationIcons, fruitIcons, marineIcons, musicIcons} from '../Icons.js'

require('./DialogCSS.css')

export default class IconDialog extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div style={{display: this.props.display}}>
                <div className='popBox-mask'/>
                <div className='popBox-content'>
                    <div style={Styles.Container}>
                        {this._renderIcons(fruitIcons)}
                        {this._renderIcons(aviationIcons)}
                        {this._renderIcons(marineIcons)}
                        {this._renderIcons(musicIcons)}
                        <text style={Styles.CloseText}
                              onClick={() => this.props.close()}>关闭
                        </text>
                    </div>
                </div>
            </div>
        )
    }

    _renderIcons(icons) {
        let items = [];
        icons.map((icon, index, icons) => {
            items.push(<img alt={'icon'}
                            src={icon}
                            style={Styles.IconImg}
                            onClick={() => this.props.select(icon)}/>)
        })
        return (
            <div style={Styles.IconImgContainer}>
                {items}
            </div>
        )
    }
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
        marginTop: 8
    },
    CloseText: {
        textAlign: 'center',
        marginTop: 8
    },
    IconImg: {
        width: 40,
        height: 40,
        marginLeft: 8
    },
    IconImgContainer: {
        display: 'flex',
        marginTop: 8,
        marginRight: 8,
    }
}