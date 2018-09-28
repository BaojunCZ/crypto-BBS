/**
 * Created by 包俊 on 2018/9/28.
 */
import React from "react"
import {getBBSName} from "../contract/utils/BBSInfoUtils"

export default class Recommend extends React.Component {

    constructor() {
        super()
        this.state = {
            recommendName: '推荐'
        }
    }

    componentDidMount() {
        getBBSName(this.props.recommend).then(name => {
            this.setState({recommendName: name})
        })
    }

    render() {
        return (
            <div style={Styles.RecommendContainer} onClick={() => this.props.onClick()}>
                <text style={Styles.Text}>{this.state.recommendName}</text>
            </div>
        )
    }
}

const Styles = {
    Text: {
        border: '1px solid #03c58b',
        borderRadius: '10%',
        padding: 5
    }
}