/**
 * Created by 包俊 on 2018/9/12.
 */
import React from 'react'

export default class TextAreaView extends React.Component {
    render() {
        return (
            <div style={Styles.ImageInputContainer}>
                <div style={Styles.ButtonImageContainer}>
                    <img alt={'img'}
                         src={this.props.image}
                         style={Styles.ButtonImage}/>
                    <text style={Styles.ButtonText}>{this.props.text}</text>
                    <text style={Styles.ButtonTextTip}>{this.props.tip}</text>
                </div>
                <textarea style={this.props.isLong ? Styles.TextInput : Styles.ImageInput}
                          onChange={e => {
                              this.props.inputValue(e.target.value)
                          }}
                          maxLength={this.props.maxLength !== undefined ? this.props.maxLength : null}
                          rows={this.props.rows !== undefined ? this.props.rows : null}
                />
            </div>
        )
    }
}

const Styles = {
    ImageInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    ButtonImageContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    ButtonImage: {
        width: 30,
        height: 30,
    },
    ButtonText: {
        fontSize: 16,
        marginLeft: 5
    },
    ButtonTextTip: {
        fontSize: 14,
    },
    ImageInput: {
        marginTop: 8,
    },
    TextInput: {
        marginTop: 8,
        height: '30vw'
    },
}