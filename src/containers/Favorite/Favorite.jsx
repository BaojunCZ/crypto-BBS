/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import {getFavorite, getFavoriteSize} from '../../contract/utils/UserInfoUtils'
import MsgItem from "../MsgItem";
import {CommonStyles} from "../../components/Styles";
import Loading from "react-loading-animation"

const everyPage = 5
export default class Favorite extends React.Component {

    constructor() {
        super()
        this.state = {
            msgCount: '',
            msgList: [],
            index: 1,
            loading: false
        }
    }

    componentDidMount() {
        document.title = "收藏"
        this._load()
    }

    render() {
        return (
            <div>
                {this.state.msgList.map(data => (
                    <MsgItem data={data} onClick={() => this.props.history.push('/msg/' + data.id)}
                             reload={() => this._load()}
                             loading={(isShow) => this.setState({loading: isShow})}/>))}
                {this._renderLoadMore()}
                {this._loading()}
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
            console.log(i - 1)
            getFavorite(i - 1).then(res => {
                console.log(res)
                if (res != 0) {
                    let list = this.state.msgList;
                    let data = {id: res, index: i - 1}
                    list.push(data)
                    this.setState({msgList: list})
                }
            }).catch(err => console.log(err))
        }
    }


    _renderLoadMore() {
        if (this.state.index * everyPage >= this.state.msgCount) {
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

    _load() {
        this.setState({msgList: [], loading: true, index: 1}, () => {
            getFavoriteSize().then(size => {
                this.setState({msgCount: size}, () => {
                    this._renderMsgList()
                    this.setState({loading: false})
                })
            }).catch(err => {
                this.setState({loading: false})
                alert("发生异常，请刷新重试")
            })
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
    LoadButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
    }
}