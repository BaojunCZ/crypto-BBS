/**
 * Created by 包俊 on 2018/9/6.
 */
import React from "react";
import {Link} from "react-router-dom";
import mineUnIcon from "../../public/image/ic_tab_mine_unclick.png"
import mineIcon from "../../public/image/ic_tab_mine_click.png"
import favoriteUnIcon from "../../public/image/ic_tab_favorite_unclick.png"
import favoriteIcon from "../../public/image/ic_tab_favorite_click.png"
import homeUnIcon from "../../public/image/ic_tab_home_unclick.png"
import homeIcon from "../../public/image/ic_tab_home_click.png"

export default class BottomTabs extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={Styles.Container}>
                <div style={Styles.ButtonContainer}>
                    <Link to={'/favorite'} style={Styles.ButtonContainer}>
                        <img alt={'favorite'}
                             src={this._renderFavorite()}
                             style={Styles.Icon}/>
                        <text style={this._renderFavoriteButton()}>排名</text>
                    </Link>
                </div>
                <Link to={'/'} style={Styles.ButtonContainer}>
                    <img alt={'sign'}
                         src={this._renderSign()}
                         style={Styles.Icon}/>
                    <text style={this._renderSignButton()}>签到</text>
                </Link>
                <Link to={'/mine'} style={Styles.ButtonContainer}>
                    <img alt={'mine'}
                         src={this._renderMine()}
                         style={Styles.Icon}/>
                    <text style={this._renderMineButton()}>我的</text>
                </Link>
            </div>
        )
    }

    _renderFavorite() {
        if (this.props.select === 1) {
            return favoriteIcon
        } else {
            return favoriteUnIcon
        }
    }

    _renderSign() {
        if (this.props.select === 2) {
            return homeIcon
        } else {
            return homeUnIcon
        }
    }

    _renderMine() {
        if (this.props.select === 3) {
            return mineIcon
        } else {
            return mineUnIcon
        }
    }

    _renderFavoriteButton() {
        if (this.props.select === 1) {
            return Styles.ButtonSelected
        } else {
            return Styles.Button
        }
    }

    _renderSignButton() {
        if (this.props.select === 2) {
            return Styles.ButtonSelected
        } else {
            return Styles.Button
        }
    }

    _renderMineButton() {
        if (this.props.select === 3) {
            return Styles.ButtonSelected
        } else {
            return Styles.Button
        }
    }
}

const Styles = {
    Container: {
        width: '100vw',
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        background: '#03c58b',
    },
    ButtonContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textDecorationLine: 'none'
    },
    Button: {
        fontSize: 12,
        color: '#ffffff',
        marginBottom: 5,
        marginTop: 3,
    },
    ButtonSelected: {
        fontSize: 12,
        color: '#000000',
        marginBottom: 5,
        marginTop: 3,
    },
    Icon: {
        width: 35,
        height: 35,
        marginTop: 5,
    }
}