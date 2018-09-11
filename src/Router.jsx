import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './containers/Home/Home.jsx'
import Test from './containers/Test.js'
import Mine from './containers/Mine/Mine.jsx'
import Favorite from './containers/Favorite.jsx'
import UnLogined from './containers/UnLogin'
import WriteMsg from './containers/WriteMessage/WriteMessage'

const history = createBrowserHistory()

const router = App => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Home} history={history}/>
            <Route path="/test" exact component={Test}/>
            <Route path="/mine" exact component={Mine} history={history}/>
            <Route path="/favorite" exact component={Favorite}/>
            <Route path="/signIn" exact component={UnLogined} history={history}/>
            <Route path="/write_msg" exact component={WriteMsg} history={history}/>
        </Switch>
    </Router>
)

export default router
