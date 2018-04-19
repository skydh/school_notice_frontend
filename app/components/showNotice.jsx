import {Form, Icon, List, Avatar, Button, Checkbox} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
var that;
import {hashHistory} from 'react-router'
import {get} from '../fetch/get.js'
import {post} from '../fetch/post.js'

var that;
class showNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isShow: true
        }
    }

    componentDidMount() {
        that = this;
        //进来就获取信息
        var result = get("http://localhost:8090/school-notice/notice/showListAll")

        result.then(res => {

            return res.text()
        }).then(text => {
            debugger
            let temp = JSON.parse(text);

            this.setState({data: temp.backData.list, isShow: temp.backData.approveMenu});
            that.state = temp;

        })
    }

    approve() {
        hashHistory.push('/register');
    }

    noticemanage() {
        hashHistory.push('/register');
    }

    alldata() {
        hashHistory.push('/alldata');
    }

    render() {


        return (
            <div>

                {
                    // 等待验证之后，再显示登录信息
                    this.state.isShow
                        ? <div><Button onClick={this.approve}>审批管理</Button> <Button
                        onClick={this.noticemanage}>公告管理</Button></div>
                        : <div></div>
                }

                <Button onClick={this.alldata}>资料完善</Button>

                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    description={item.writer}
                                    title={<a href="https://ant.design">{item.title}</a>}

                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>

        );
    }
}


export default showNotice