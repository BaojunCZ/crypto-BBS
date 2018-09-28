/**
 * Created by 包俊 on 2018/9/11.
 */
import React from 'react';
import ItemInfo from "../components/ItemInfo"
import IconBBSPlayer from "../public/image/icon_bbs_player.png"
import IconBalance from "../public/image/icon_balance.png"
import {getBalance} from "../contract/utils/UserInfoUtils"
import PartingLine from "../components/PartingLine"
import Title from "../components/Title"
import IconMsg from "../public/image/icon_bbs_msgs.png"
import IconPic from "../public/image/icon_image.png"
import {CommonStyles} from "../components/Styles";
import Loading from "react-loading-animation"
import {sendMsg} from "../contract/utils/MsgUtils"
import TextAreaView from "../components/TextAreaView"
import {checkPlayer} from "../utils/CheckPlayer";

export default class WriteMessage extends React.Component {

    constructor() {
        super()
        this.state = {
            balance: '...',
            button: CommonStyles.ButtonClickAble,
            loading: false,
            buttonText: '确定',
            imageMsg: '',
            infoMsg: '',
            url: '',
        }
    }

    componentDidMount() {
        document.title = "发帖"
        getBalance(window.neuron.getAccount()).then(balance => {
            this.setState({balance: balance})
        })
    }

    render() {
        return (
            <div>
                <Title title={'发帖'}
                       leftShow={true}
                       leftClick={() => {
                           this.props.history.goBack();
                       }}/>
                <PartingLine/>
                <ItemInfo name={'Address'} value={this._subString(window.neuron.getAccount())} icon={IconBBSPlayer}/>
                <ItemInfo name={'余额'} value={this.state.balance} icon={IconBalance}/>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                <TextAreaView image={IconPic}
                              text={'图片'}
                              tip={'（请输入图片地址）'}
                              isLong={false}
                              inputValue={(value) => this.setState({imageMsg: value})}/>
                <TextAreaView image={IconMsg}
                              text={'文字'}
                              isLong={true}
                              inputValue={(value) => this.setState({infoMsg: value})}/>
                <TextAreaView image={IconMsg}
                              text={'跳转网址'}
                              isLong={false}
                              inputValue={(value) => this.setState({url: value})}/>
                <div style={Styles.ButtonContainer}>
                    <text style={this.state.button}
                          onClick={() => this._send()}>{this.state.buttonText}</text>
                </div>
                {this._loading()}
            </div>
        )
    }

    _subString(address) {
        return address.substring(0, 8) + "..." + address.slice(address.length - 8)
    }

    _send() {
        checkPlayer(window.neuron.getAccount())
            .then(player => {
                if (this.state.imageMsg !== '' || this.state.infoMsg !== '') {
                    this.setState({button: CommonStyles.ButtonUnClickAble, loading: true, buttonText: '发送中...'})
                    sendMsg(this.state.imageMsg, this.state.infoMsg, this.state.url).then(res => {
                        this.props.history.goBack();
                    }).catch(err => {
                        alert('失败')
                        this.setState({loading: false, button: CommonStyles.ButtonClickAble, buttonText: '发送'})
                    })
                } else {
                    alert("请填写帖子内容！")
                }
            })
            .catch(err => {
                if (err == '未注册')
                    alert("请先注册，否则只能查看，无法评论与收藏")
            })
    }

    _loading() {
        if (this.state.loading)
            return (<Loading style={CommonStyles.Loading}/>)
        else
            return null
    }

}

const Styles = {
    TitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    Title: {
        color: '#2E313E',
        fontSize: 20,
    },
    ButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}