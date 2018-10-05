/**
 * Created by 包俊 on 2018/10/5.
 */
import React from 'react';
import IconName from "../../public/image/icon_bbs_name.png";
import TextAreaView from "../TextAreaView";

require('./DialogCSS.css')

export default class SetNameDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: '',
        }
    }

    render() {
        return (
            <div style={{display: this.props.display}}>
                <div className='popBox-mask'/>
                <div className='popBox-content'>
                    <div className={'popBox-name-root-container'}>
                        <TextAreaView image={IconName}
                                      text={this.props.title}
                                      tip={'（10字以内）'}
                                      isLong={false}
                                      maxLength={10}
                                      rows={1}
                                      inputValue={(value) => this.setState({userName: value})}/>
                        <div style={Styles.ButtonContainer} className={'popBox-name-button'}>
                            <text style={Styles.OkText} onClick={() => {
                                this.props.setName(this.state.userName)
                                this.setState({userName: ''})
                            }}>确定
                            </text>
                            <text style={Styles.CloseText} onClick={() => this.props.close()}>取消</text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const Styles = {
    ButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CloseText: {
        marginLeft: 20,
        backgroundColor: '#e0e0e0',
    },
    OkText: {
        backgroundColor: '#03c58b',
        color: '#fff',
    }
}
