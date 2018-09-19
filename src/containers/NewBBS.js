/**
 * Created by 包俊 on 2018/9/19.
 */
import React from 'react'
import Title from "../components/Title";
import IconPic from "../public/image/icon_image.png";
import TextAreaView from "../components/TextAreaView";
import IconMsg from "../public/image/icon_bbs_msgs.png";
import {CommonStyles} from "../components/Styles";
import Loading from "react-loading-animation"
import {deploy} from "../contract/utils/tokenStore"

export default class NewBBS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            button: CommonStyles.ButtonClickAble,
            buttonText: '创建',
            name: '',
            logo: '',
            synopsis: '',
            descr: '',
        }
    }


    render() {
        return (
            <div>
                <Title title={'新建糖果盒'}
                       leftShow={true}
                       leftClick={() => {
                           this.props.history.goBack();
                       }}/>
                <TextAreaView image={IconPic}
                              text={'糖果名'}
                              tip={'（必填）'}
                              isLong={false}
                              inputValue={(value) => this.setState({name: value})}/>
                <TextAreaView image={IconPic}
                              text={'logo'}
                              tip={'（请输入图片地址）'}
                              isLong={false}
                              inputValue={(value) => this.setState({logo: value})}/>
                <TextAreaView image={IconMsg}
                              text={'简介'}
                              tip={'（必填，20字以内）'}
                              isLong={false}
                              inputValue={(value) => this.setState({synopsis: value})}/>
                <TextAreaView image={IconMsg}
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
        if (this.state.name !== '' && this.state.synopsis !== '') {
            this.setState({buttonText: '创建中', button: CommonStyles.ButtonUnClickAble, loading: true})
            deploy([this.state.name, this.state.synopsis, this.state.logo, this.state.descr]).then(res => {
                window.BBSAddress = res.contractAddress;
                localStorage.setItem('BBSAddress', window.BBSAddress)
                alert(localStorage.BBSAddress)
                this.props.history.push('./main')
            }).catch(err => {
                alert(err)
                this.setState({buttonText: '创建', button: CommonStyles.ButtonClickAble, loading: false})
            })
        } else {
            alert("请输入必填项")
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