import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'


import './static/css/common.less'

// 创建 Redux 的 store 对象

import Login from './components/Login'
import RouterMap from './router/RouteMap'
// 测试 fetch 的功能
import {getData, postData} from './fetch/test.js'
// import { getData, postData } from './fetch/data.js'
 getData();
// postData();

render(
    <RouterMap />,
    document.getElementById('root')
)
