/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'
import {initPlayer} from "../contract/utils/UserInfoUtils"
import Loading from "react-loading-animation"
import Title from "../components/Title"
import {CommonStyles} from "../components/Styles";
import IconPic from "../public/image/icon_image.png";
import TextAreaView from "../components/TextAreaView"

export default class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            button: CommonStyles.ButtonClickAble,
            loading: false,
            heaPortrait: '',
            sex: true,
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <Title title={'注册'}
                       leftShow={false}/>
                <TextAreaView image={IconPic}
                              text={'昵称'}
                              isLong={false}
                              inputValue={(value) => this.setState({userName: value})}/>
                <TextAreaView image={IconPic}
                              text={'头像'}
                              tip={'（请输入图片地址）'}
                              isLong={false}
                              inputValue={(value) => this.setState({heaPortrait: value})}/>
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
            </div>
        )
    }

    _loginIn() {
        if (this.state.userName !== '') {
            this.setState({loading: true})
            initPlayer(this.state.userName, this.state.sex, this.state.heaPortrait).then(res => {
                this.props.history.push("/")
            }).catch(err => {
                alert(err)
                this.setState({loading: false})
            })
        }
        else
            alert('请输入昵称')
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
    }
}