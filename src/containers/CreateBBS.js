/**
 * Created by 包俊 on 2018/9/19.
 */
import React from "react"
import {CommonStyles} from "../components/Styles";
import Title from "../components/Title";

export default class CreateBBS extends React.Component {

    constructor() {
        super()
        this.state = {
            contractAddress: window.BBSAddress === '' ? '0x4d67eF9E064f831b7B51359ffDBc77dA3eA6c8dD' : window.BBSAddress
        }
    }

    render() {
        return (
            <div style={Styles.Container}>
                <Title title={'芒果'}/>
                <div style={{marginTop: 50}}/>
                <button style={CommonStyles.ButtonClickAble} onClick={() => this.props.history.push('/new_BBS')}>创建社区
                </button>
                <input style={Styles.Input} onChange={(e) => {
                    this.setState({contractAddress: e.target.value})
                }}
                       value={this.state.contractAddress}/>
                <button style={Styles.ButtonClickAble} onClick={() => this._toBBS()}>加入社区</button>
            </div>
        )
    }

    _toBBS() {
        if (this.state.contractAddress !== '') {
            window.BBSAddress = this.state.contractAddress;
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
        backgroundColor: '#2e6da4',
        padding: '6px 12px',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '14px',
    }
}