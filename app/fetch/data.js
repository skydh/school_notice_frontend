import {get} from './get.js'
import {post} from './post.js'
import {hashHistory} from 'react-router'
/**
 * 封装前端请求
 * @type {string}
 */
var weburl = "http://localhost:8090/school-notice/";
export function login(url) {
    // '/api/1' 获取字符串
    var result = get(weburl + url)

    result.then(res => {
        debugger
        return res.text()
    }).then(text => {
        debugger
        console.log(text)
        let temp = JSON.parse(text);
        if (temp.success) {
            document.cookie = "userId=" + temp.backData.userId;
            document.cookie = "token=" + temp.backData.token;

            hashHistory.push('/showNotice');
        } else {

            hashHistory.push('/*');
        }

    })

    // '/api/2' 获取json

}

export function registerFun(url) {
    // '/api/post' 提交数据
    var result = get(weburl + url)

    result.then(res => {
        debugger
        return res.text()
    }).then(text => {
        debugger
        console.log(text)
        let temp = JSON.parse(text);
        if (temp.success) {
            document.cookie = "userId=" + temp.backData.userId;
            document.cookie = "token=" + temp.backData.token;
            hashHistory.push('/showNotice');

        } else {
            hashHistory.push('/*');

        }
    })

}

export function postData(url, data) {
    // '/api/post' 提交数据
    var result = post(weburl, data)

    result.then(res => {
        return res.json()
    }).then(json => {
        console.log(json)
    })
}