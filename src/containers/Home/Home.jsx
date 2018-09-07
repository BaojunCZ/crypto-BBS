import React from 'react'
import BottomTabs from '../../components/BottomTabs/BottomTabs'
import {checkPlayer} from '../../utils/CheckPlayer'
import {address1, address2} from '../../contract/test.config'

export default class Home extends React.Component {

    componentDidMount() {
        checkPlayer(address1)
            .then(name => {
            })
            .catch(err => {
                if (err === "未注册") {
                    alert("请先注册，才能参加打卡")
                }
            })
    }

    render() {
        return (
            <div>
                <text>健身打卡</text>
                <BottomTabs select={2}/>
            </div>
        )
    }

}

const Styles = {}