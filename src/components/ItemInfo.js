/**
 * Created by 包俊 on 2018/9/9.
 */
import React from 'react';

export default class ItemInfo extends React.Component {
    render() {
        return (
            <div style={Styles.Container}>
                <div style={Styles.TitleContainer}>
                    <img alt={"icon"}
                         src={this.props.icon}
                         style={Styles.Icon}/>
                    <text style={Styles.TitleText}>{this.props.name}</text>
                </div>
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
        marginTop: 10
    },
    Icon: {
        width: 25,
        height: 25,
    },
    TitleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    TitleText: {
        fontSize: 14,
        marginLeft: 5,
    }
}