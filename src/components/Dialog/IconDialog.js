/**
 * Created by 包俊 on 2018/10/3.
 */
import React from 'react';
import {CommonStyles} from '../Styles'
import {aviationIcons, fruitIcons, marineIcons, musicIcons} from '../Icons.js'

require('./DialogCSS.css')

export default class IconDialog extends React.Component {

    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <div style={{display: this.props.display}}>
                <div className='popBox-mask'/>
                <div className='popBox-content'>
                    <div className={'popBox-icon-root-container'}>
                        {this._renderIcons(fruitIcons)}
                        {this._renderIcons(aviationIcons)}
                        {this._renderIcons(marineIcons)}
                        {this._renderIcons(musicIcons)}
                        <text className={'popBox-icon-tip-container '}>请输入图片地址</text>
                        <div style={Styles.IconInputContainer}>
                            <input style={Styles.IconInput}
                                   onChange={e => this.setState({input: e.target.value})}/>
                            <text style={CommonStyles.ButtonClickAble}
                                  onClick={() => {
                                      if (this.state.input !== '') {
                                          this.props.select(this.state.input)
                                      }
                                  }}>确定
                            </text>
                        </div>
                        <text className={'popBox-icon-close-text'}
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
    IconImg: {
        width: 40,
        height: 40,
        marginLeft: 8
    },
    IconImgContainer: {
        display: 'flex',
        marginTop: 8,
        marginRight: 8,
    },
    IconInputContainer: {
        marginTop: 5,
        marginLeft: 10
    },
    IconInput: {
        marginRight: 20
    }
}