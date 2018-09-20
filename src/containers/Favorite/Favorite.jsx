/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import {getFavorite, getFavoriteSize} from '../../contract/utils/UserInfoUtils'
import MsgItem from "../MsgItem";
import {CommonStyles} from "../../components/Styles";

const everyPage = 5
export default class Favorite extends React.Component {

    constructor() {
        super()
        this.state = {
            msgCount: '',
            msgList: [],
            index: 1,
        }
    }

    componentDidMount() {
        document.title = "收藏"
        getFavoriteSize().then(size => {
            this.setState({msgCount: size}, () => {
                this._renderMsgList()
            })
        }).catch(err => {
            alert("发生异常，请刷新重试")
        })
    }

    render() {
        return (
            <div>
                {this.state.msgList.map(id => (
                    <MsgItem id={id} onClick={() => this.props.history.push('/msg/' + id)}/>))}
                {this._renderLoadMore()}
            </div>
        )
    }

    _renderMsgList() {
        let index = 0
        if (this.state.msgCount <= everyPage) {
            index = this.state.msgCount;
        } else {
            index = this.state.msgCount - (this.state.index - 1) * everyPage
        }
        for (let i = index; index - i < 5 && i > 0; i--) {
            getFavorite(i - 1).then(res => {
                let list = this.state.msgList;
                list.push(res)
                if (res != 0)
                    this.setState({msgList: list})
            }).catch(err => console.log(err))
        }
    }


    _renderLoadMore() {
        if (this.state.index * everyPage > this.state.msgCount) {
            return (
                <div style={Styles.LoadButton}>
                    <text style={CommonStyles.ButtonUnClickAble}>无更多内容</text>
                </div>
            )
        } else {
            return (
                <div style={Styles.LoadButton}>
                    <text onClick={() => this._loadMore()} style={CommonStyles.ButtonClickAble}>加载更多</text>
                </div>
            )
        }
    }

    _loadMore() {
        this.setState({index: this.state.index + 1}, () => {
            this._renderMsgList()
        })
    }

}

const Styles = {
    LoadButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    }
}