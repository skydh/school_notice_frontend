import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import App from '../containers'
import Home from '../containers/Home'
import City from '../containers/City'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'
import showNotice from '../components/showNotice'
import AllData from '../components/AllData'
var hashHistory = Router.hashHistory;

import Login from '../components/Login'
import Register from '../components/Register'

// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/showNotice' component={showNotice}/>
                    <Route path='/alldata' component={AllData}/>
                    <Route path='/detail/:id' component={Detail}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
