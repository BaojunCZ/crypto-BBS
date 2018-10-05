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
                        {this._renderFruitIcons()}
                        {this._renderAviationIcons()}
                        {this._renderMarineIcons()}
                        {this._renderMusicIcons()}
                        <text style={Styles.CloseText}
                              onClick={() => this.props.close()}>关闭
                        </text>
                    </div>
                </div>
            </div>
        )
    }

    _renderFruitIcons() {
        let items = [];
        fruitIcons.map((icon, index, icons) => {
            items.push(<img alt={'icon'}
                            src={icon}
                            style={Styles.IconImg}
                            onClick={() => this.props.select({name: 'fruit', index: index})}/>)
        })
        return (
            <div style={Styles.IconImgContainer}>
                {items}
            </div>
        )
    }

    _renderAviationIcons() {
        let items = [];
        aviationIcons.map((icon, index, icons) => {
            items.push(<img alt={'icon'}
                            src={icon}
                            style={Styles.IconImg}
                            onClick={() => this.props.select({name: 'aviation', index: index})}/>)
        })
        return (
            <div style={Styles.IconImgContainer}>
                {items}
            </div>
        )
    }

    _renderMarineIcons() {
        let items = [];
        marineIcons.map((icon, index, icons) => {
            items.push(<img alt={'icon'}
                            src={icon}
                            style={Styles.IconImg}
                            onClick={() => this.props.select({name: 'marine', index: index})}/>)
        })
        return (
            <div style={Styles.IconImgContainer}>
                {items}
            </div>
        )
    }

    _renderMusicIcons() {
        let items = [];
        musicIcons.map((icon, index, icons) => {
            items.push(<img alt={'icon'}
                            src={icon}
                            style={Styles.IconImg}
                            onClick={() => this.props.select({name: 'music', index: index})}/>)
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