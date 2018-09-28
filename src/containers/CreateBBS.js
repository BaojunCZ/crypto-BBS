/**
 * Created by 包俊 on 2018/9/19.
 */
import React from "react"
import {CommonStyles} from "../components/Styles";
import Title from "../components/Title";
import {defaultContract} from "../contract/constantNoAdmin"

export default class CreateBBS extends React.Component {

    constructor() {
        super()
        this.state = {
            contractAddress: window.BBSAddress === '' ? defaultContract : window.BBSAddress
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <Title title={'芒果'}/>
                <div style={{marginTop: 50}}/>
                <text style={CommonStyles.ButtonClickAble} onClick={() => this.props.history.push('/new_BBS')}>创建社区
                </text>
                <input style={Styles.Input} onChange={(e) => {
                    this.setState({contractAddress: e.target.value})
                }}
                       value={this.state.contractAddress}/>
                <text style={Styles.ButtonClickAble} onClick={() => this._toBBS()}>加入社区</text>
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
}

const Styles = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    Input: {
        marginTop: 30,
        width: '80vw'
    },
    ButtonClickAble: {
        marginTop: 20,
        backgroundColor: '#03c58b',
        padding: '6px 12px',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '14px',
    }
}