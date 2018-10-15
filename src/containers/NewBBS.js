/**
 * Created by 包俊 on 2018/9/19.
 */
import React from 'react'
import Title from "../components/Title";
import IconPic from "../public/image/icon_image.png";
import TextAreaView from "../components/TextAreaView";
import IconMsg from "../public/image/icon_bbs_msgs.png";
import IconName from "../public/image/icon_bbs_name.png";
import IconBoard from "../public/image/icon_bbs_board.png";
import {CommonStyles} from "../components/Styles";
import Loading from "react-loading-animation"
import {deploy} from "../contract/utils/tokenStore"
import IconDialog from "../components/Dialog/IconDialog";
import defaultIcon from "../public/image/icon.png";

export default class NewBBS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: CommonStyles.ButtonClickAble,
            buttonText: '创建',
            name: '',
            logo: defaultIcon,
            synopsis: '',
            descr: '',
            display: 'none'
        }
    }

    render() {
        return (
            <div>
                <Title title={'新建'}
                       leftShow={true}
                       leftClick={() => {
                           this.props.history.goBack();
                       }}/>
                <TextAreaView image={IconName}
                              text={'社区名'}
                              tip={'（必填，10字以内）'}
                              isLong={false}
                              maxLength={10}
                              rows={1}
                              inputValue={(value) => this.setState({name: value})}/>
                <div style={Styles.HeadContainer} onClick={() => this.setState({display: 'block'})}>
                    <div style={Styles.ButtonImageContainer}>
                        <img alt={'img'}
                             src={IconPic}
                             style={Styles.ButtonImage}/>
                        <text style={Styles.ButtonText}>{"头像"}</text>
                        <text style={Styles.ButtonTextTip}>{"（点击头像设置）"}</text>
                    </div>
                    <img alt={'icon'} src={this.state.logo} style={Styles.HeadIcon}/>
                </div>
                <TextAreaView image={IconMsg}
                              text={'简介'}
                              tip={'（必填，20字以内）'}
                              isLong={false}
                              maxLength={20}
                              rows={1}
                              inputValue={(value) => this.setState({synopsis: value})}/>
                <TextAreaView image={IconBoard}
                              text={'公告'}
                              isLong={true}
                              inputValue={(value) => this.setState({descr: value})}/>
                <div style={Styles.ButtonContainer}>
                    <text style={this.state.button}
                          onClick={() => this._send()}>{this.state.buttonText}</text>
                </div>
                {this._loading()}
                <IconDialog display={this.state.display}
                            select={(icon => {
                                this.setState({display: 'none', logo: icon})
                            })}
                            close={() => this.setState({display: 'none'})}/>
            </div>
        )
    }

    _send() {
        if (this.state.name !== '' && this.state.synopsis !== '') {
            this.setState({buttonText: '创建中', button: CommonStyles.ButtonUnClickAble, loading: true})
            deploy([this.state.name, this.state.synopsis, this.state.descr, this.state.logo]).then(res => {
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