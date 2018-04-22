import {Form, Icon, List, Avatar, Button, Checkbox} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
var that;
import {hashHistory} from 'react-router'
import {get} from '../fetch/get.js'
import {post} from '../fetch/post.js'

import {doApprove} from "../fetch/data"

var that;
class showApprove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

        }
    }

    componentDidMount() {
        that = this;
        //进来就获取信息
        var result = get("http://localhost:8090/school-notice/user/showApprove")
        result.then(res => {
            return res.text()
        }).then(text => {
            let temp = JSON.parse(text);
            this.setState({data: temp.backData});
        })
    }

    onclickO(item, a) {
        debugger


        let ids = "id=" + item.id + "&isApprove=1"

        var result=   get("http://localhost:8090/school-notice/user/doApprove?" + ids)
        result.then(res => {
            return res.text()
        }).then(text => {
            debugger
            var result = get("http://localhost:8090/school-notice/user/showApprove")
            result.then(res => {
                return res.text()
            }).then(text => {
                let temp = JSON.parse(text);
                this.setState({data: temp.backData});
            })

        })


    }

    onclickR(item, a) {
        let ids = "id=" + item.id + "&isApprove=2"

        var result= get("http://localhost:8090/school-notice/user/doApprove?" + ids)
        result.then(res => {
            return res.text()
        }).then(text => {
            debugger
            var result = get("http://localhost:8090/school-notice/user/showApprove")
            result.then(res => {
                return res.text()
            }).then(text => {
                let temp = JSON.parse(text);
                this.setState({data: temp.backData});
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<a onClick={that.onclickO.bind(this, item)}>同意入群</a>,
                                    <a onClick={this.onclickR.bind(this, item)}>不同意入群</a>]}>
                                <List.Item.Meta
                                    title={item.username}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>

        );
    }
}


export default showApprove