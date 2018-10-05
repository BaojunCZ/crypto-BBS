/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import {initPlayer} from "../contract/utils/UserInfoUtils"
import Loading from "react-loading-animation"
import Title from "../components/Title"
import {CommonStyles} from "../components/Styles";
import IconPic from "../public/image/icon_image.png";
import defaultIcon from "../public/image/icon.png"
import TextAreaView from "../components/TextAreaView"
import IconDialog from "../components/Dialog/IconDialog"

export default class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            button: CommonStyles.ButtonClickAble,
            loading: false,
            headPortrait: defaultIcon,
            synopsis: '',
            sex: true,
            display: 'none'
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <Title title={'注册'}
                       leftShow={false}/>
                <TextAreaView image={IconPic}
                              text={'昵称'}
                              tip={'（必填，10字以内）'}
                              isLong={false}
                              maxLength={10}
                              rows={1}
                              inputValue={(value) => this.setState({userName: value})}/>
                <div style={Styles.HeadContainer} onClick={() => this._setIcon()}>
                    <div style={Styles.ButtonImageContainer}>
                        <img alt={'img'}
                             src={IconPic}
                             style={Styles.ButtonImage}/>
                        <text style={Styles.ButtonText}>{"头像"}</text>
                        <text style={Styles.ButtonTextTip}>{"（点击头像设置）"}</text>
                    </div>
                    <img alt={'icon'} src={this.state.headPortrait} style={Styles.HeadIcon}/>
                </div>
                <TextAreaView image={IconPic}
                              text={'简介'}
                              tip={'（必填，20字以内）'}
                              maxLength={20}
                              isLong={true}
                              inputValue={(value) => this.setState({synopsis: value})}/>
                <form style={Styles.SexRadio}>
                    <input type="radio" name="sex" defaultChecked value={true} checked={this.state.sex}
                           onChange={() => this.setState({sex: true})}/>男
                    <input type="radio" name="sex" value={false} checked={!this.state.sex}
                           onChange={() => this.setState({sex: false})}/>女
                </form>
                <div style={Styles.ButtonContainer}>
                    <text style={this.state.button} onClick={() => this._loginIn()}>确定</text>
                </div>
                {this._loading()}
                <IconDialog display={this.state.display}
                            select={(icon => {
                                this.setState({display: 'none', headPortrait: icon})
                            })}
                            close={() => this.setState({display: 'none'})}/>
            </div>
        )
    }

    _loginIn() {
        if (this.state.userName !== '' && this.state.synopsis !== '') {
            this.setState({loading: true})
            initPlayer(this.state.userName, this.state.sex, this.state.headPortrait, this.state.synopsis).then(res => {
                this.props.setStatus()
            }).catch(err => {
                alert(err)
                this.setState({loading: false})
            })
        }
        else
            alert('请输入必填项')
    }

    _setIcon() {
        this.setState({display: 'block'})
    }

    _loading() {
        if (this.state.loading)
            return (<Loading style={CommonStyles.Loading}/>)
        else
            return null
    }
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
    },
    Title: {
        fontSize: 24,
        marginTop: 50,
        color: '#2E313E'
    },
    UserName: {
        display: 'flex',
        marginTop: 70
    },
    UserText: {
        fontSize: 14,
    },
    UserInput: {
        marginLeft: 10,
    },
    ButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    SexRadio: {
        marginTop: 20,
        marginLeft: 20
    },
    HeadContainer: {
        marginLeft: 20,
        marginTop: 20,
    },
    HeadIcon: {
        width: 60,
        marginTop: 10
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
}