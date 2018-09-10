/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react';
import BottomTabs from '../components/BottomTabs'

export default class Favorite extends React.Component {
    render() {
        return (
            <div>
                <text>排名</text>
                <BottomTabs select={1}/>
            </div>
        )
    }
}