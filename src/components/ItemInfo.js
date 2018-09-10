/**
 * Created by 包俊 on 2018/9/9.
 */
import React from 'react';

export default class ItemInfo extends React.Component {
    render() {
        return (
            <div style={Styles.Container}>
                <text>{this.props.name}</text>
                <text>{this.props.value}</text>
            </div>
        )
    }
}

const Styles = {
    Container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '10px',
        marginBottom: '10px'
    }
}