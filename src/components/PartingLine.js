/**
 * Created by 包俊 on 2018/9/6.
 */
import React from 'react'

export default class PartingLine extends React.Component {
    render() {
        return (
            <div style={Styles.Line}/>
        )
    }
}

const Styles = {
    Line: {
        background: '#E9EBF0',
        width: '100vw',
        height: 10,
    }
}