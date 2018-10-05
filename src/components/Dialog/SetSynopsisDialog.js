/**
 * Created by 包俊 on 2018/10/5.
 */
import React from 'react';
import IconMsg from "../../public/image/icon_bbs_msgs.png";
import TextAreaView from "../TextAreaView";

require('./DialogCSS.css')

export default class SetSynopsisDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            synopsis: '',
        }
    }

    render() {
        return (
            <div style={{display: this.props.display}}>
                <div className='popBox-mask'/>
                <div className='popBox-content'>
                    <div className={'popBox-synopsis-root-container'}>
                        <TextAreaView image={IconMsg}
                                      text={this.props.title}
                                      tip={'（必填，20字以内）'}
                                      maxLength={20}
                                      isLong={true}
                                      inputValue={(value) => this.setState({synopsis: value})}/>
                        <div style={Styles.ButtonContainer} className={'popBox-name-button'}>
                            <text style={Styles.OkText} onClick={() => {
                                this.props.setSynopsis(this.state.synopsis)
                                this.setState({synopsis: ''})
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
