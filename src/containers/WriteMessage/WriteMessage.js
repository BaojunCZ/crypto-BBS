/**
 * Created by 包俊 on 2018/9/11.
 */
import React from 'react';
import ItemInfo from "../../components/ItemInfo"
import {address1} from "../../contract/test.config"
import IconBBSPlayer from "../../public/image/icon_bbs_player.png"
import IconBalance from "../../public/image/icon_balance.png"
import {getBalance} from "../../contract/utils/UserInfoUtils"
import PartingLine from "../../components/PartingLine"
import Title from "../../components/Title"
import IconMsg from "../../public/image/icon_bbs_msgs.png"
import IconPic from "../../public/image/icon_image.png"
import {CommonStyles} from "../../components/Styles";
import Loading from "react-loading-animation"

export default class WriteMessage extends React.Component {

    constructor() {
        super()
        this.state = {
            balance: '...',
            button: CommonStyles.ButtonClickAble,
            loading: false,
            buttonText: '确定'
        }
    }

    componentDidMount() {
        document.title = "发帖"
        getBalance(address1).then(balance => {
            this.setState({balance: balance})
        })
    }

    render() {
        return (
            <div>
                <Title title={'发帖'}/>
                <PartingLine/>
                <ItemInfo name={'Address'} value={this._subString(address1)} icon={IconBBSPlayer}/>
                <ItemInfo name={'余额'} value={this.state.balance} icon={IconBalance}/>
                <div style={{marginTop: 10}}>
                    <PartingLine/>
                </div>
                <div style={Styles.ImageInputContainer}>
                    <div style={Styles.ButtonImageContainer}>
                        <img alt={'img'}
                             src={IconPic}
                             style={Styles.ButtonImage}/>
                        <text style={Styles.ButtonText}>图片</text>
                        <text style={Styles.ButtonTextTip}>（请输入图片地址）</text>
                    </div>
                    <textarea style={Styles.ImageInput}/>
                </div>
                <div style={Styles.ImageInputContainer}>
                    <div style={Styles.ButtonImageContainer}>
                        <img alt={'text'}
                             src={IconMsg}
                             style={Styles.ButtonImage}/>
                        <text style={Styles.ButtonText}>文字</text>
                    </div>
                    <textarea style={Styles.TextInput}/>
                </div>
                <div style={Styles.ButtonContainer}>
                    <text style={this.state.button} onClick={() => this._send()}>{this.state.buttonText}</text>
                </div>
                {this._loading()}
            </div>
        )
    }

    _subString(address) {
        return address.substring(0, 8) + "..." + address.slice(address.length - 8)
    }

    _send() {
        this.setState({button: CommonStyles.ButtonUnClickAble, loading: true, buttonText: '发送中...'})
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
        marginTop: 8
    },
    TextInput: {
        marginTop: 8,
        height: '30vw'
    },
    ButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}