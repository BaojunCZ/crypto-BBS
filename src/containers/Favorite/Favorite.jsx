/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';

export default class Favorite extends React.Component {

    componentDidMount() {
        document.title = "收藏"
    }

    render() {
        return (
            <div>
                <text>收藏</text>
            </div>
        )
    }
}