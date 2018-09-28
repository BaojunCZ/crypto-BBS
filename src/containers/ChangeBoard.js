/**
 * Created by 包俊 on 2018/9/28.
 */
import React from 'react'
import Title from "../components/Title";
import TextAreaView from "../components/TextAreaView";
import IconBoard from "../public/image/icon_bbs_board.png";
import Loading from "react-loading-animation";
import {CommonStyles} from "../components/Styles";
import {setBBSDescribe} from "../contract/utils/BBSInfoUtils"

export default class ChangeBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            button: CommonStyles.ButtonClickAble,
            buttonText: '发送',
            descr: this.props.descr,
        }
    }

    render() {
        return (
            <div>
                <Title title={'修改公告'}
                       leftShow={true}
                       leftClick={() => {
                           this.props.history.goBack();
                       }}/>
                <TextAreaView image={IconBoard}
                              text={'公告'}
                              isLong={true}
                              inputValue={(value) => this.setState({descr: value})}/>
                <div style={Styles.ButtonContainer}>
                    <text style={this.state.button}
                          onClick={() => this._send()}>{this.state.buttonText}</text>
                </div>
                {this._loading()}
            </div>
        )
    }

    _send() {
        if (this.state.descr !== '') {
            this.setState({buttonText: '发送中', button: CommonStyles.ButtonUnClickAble, loading: true})
            setBBSDescribe(this.state.descr).then(res => {
                this.props.history.goBack();
            }).catch(err => {
                alert("设置失败")
            })
        } else {
            alert("请输入公告")
        }
    }

    _loading() {
        if (this.state.loading)
            return (<Loading style={CommonStyles.Loading}/>)
        else
            return null
    }

}

const Styles = {
    ButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}
