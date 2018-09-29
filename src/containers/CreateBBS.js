/**
 * Created by 包俊 on 2018/9/19.
 */
import React from "react"
import {CommonStyles} from "../components/Styles";
import Title from "../components/Title";
import {defaultContract, reommendContract1, reommendContract2, reommendContract3} from "../contract/constantNoAdmin"
import Recommend from "./Recommend"

export default class CreateBBS extends React.Component {

    constructor() {
        super()
        this.state = {
            contractAddress: window.BBSAddress === '' ? defaultContract : window.BBSAddress,
            recommendName1: '推荐1',
            recommendName2: '推荐2',
            recommendName3: '推荐3',
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <Title title={'芒果'}/>
                <div style={{marginTop: 30}}/>
                <text style={Styles.RecommendText}>推荐社区</text>
                <div style={Styles.RecommendContainer}>
                    <Recommend recommend={reommendContract1}
                               onClick={() => {
                                   this._recommend(reommendContract1)
                               }}/>
                    <Recommend recommend={reommendContract2}
                               onClick={() => {
                                   this._recommend(reommendContract2)
                               }}/>
                    <Recommend recommend={reommendContract3}
                               onClick={() => {
                                   this._recommend(reommendContract3)
                               }}/>
                </div>
                <text style={CommonStyles.ButtonClickAble} onClick={() => this.props.history.push('/new_BBS')}>创建社区
                </text>
                <input style={Styles.Input} onChange={(e) => {
                    this.setState({contractAddress: e.target.value})
                }}
                       value={this.state.contractAddress}/>
                <text style={Styles.ButtonClickAble} onClick={() => this._toBBS()}>加入社区</text>
                <a href={'https://github.com/BaojunCZ/crypto-BBS'}
                   style={Styles.Link}>Github源码</a>
            </div>
        )
    }

    _toBBS() {
        if (this.state.contractAddress !== '') {
            window.BBSAddress = this.state.contractAddress;
            localStorage.BBSAddress = this.state.contractAddress
            this.props.history.push('./main')
        }
    }

    _recommend(contract) {
        this.setState({contractAddress: contract}, () => this._toBBS())
    }
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    Input: {
        marginTop: 40,
        width: '80vw'
    },
    ButtonClickAble: {
        marginTop: 10,
        backgroundColor: '#03c58b',
        padding: '6px 12px',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '14px',
    },
    RecommendText: {
        fontSize: 20
    },
    RecommendContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80vw',
        marginTop: 20,
        marginBottom: 20
    },
    Link: {
        display: 'flex',
        position: 'fixed',
        bottom: 30,
    }
}