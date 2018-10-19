import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Test from './containers/Test.js'
import UnLogined from './containers/SignIn'
import WriteMsg from './containers/WriteMessage'
import MainPage from './containers/MainPage/MainPage.js'
import MsgDetail from './containers/MsgDetail'
import CreateBBS from './containers/CreateBBS'
import NewBBS from './containers/NewBBS'
import SetBoard from './containers/ChangeBoard'

const history = createBrowserHistory()

const router = App => (
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/main" exact component={MainPage} history={history}/>
            <Route path="/test" exact component={Test}/>
            <Route path="/signIn" exact component={UnLogined} history={history}/>
            <Route path="/write_msg" exact component={WriteMsg} history={history}/>
            <Route path="/msg/:id" exact component={MsgDetail} history={history}/>
            <Route path="/" exact component={CreateBBS} history={history}/>
            <Route path="/new_BBS" exact component={NewBBS} history={history}/>
            <Route path="/setBoard" exact component={SetBoard} history={history}/>
        </Switch>
    </BrowserRouter>
)

export default router
