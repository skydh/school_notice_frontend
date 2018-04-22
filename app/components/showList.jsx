import {Form, Icon, List, Avatar, Button, Checkbox,message} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
var that;
import {hashHistory} from 'react-router'
import {get} from '../fetch/get.js'
import {post} from '../fetch/post.js'

var that;
class showList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []

        }
    }

    componentDidMount() {
        that = this;
        //进来就获取信息
        var result = get("http://localhost:8090/school-notice/notice/showList")
        result.then(res => {
            return res.text()
        }).then(text => {

            let temp = JSON.parse(text);
            this.setState({data: temp.backData});
        })
    }


    delete(item, a) {
        debugger
        var result = get("http://localhost:8090/school-notice/notice/delete?ids="+item.id)
        result.then(res => {
            return res.text()
        }).then(text => {

            let temp = JSON.parse(text);
            this.setState({data: temp.backData});
        })


    }

    add() {
        hashHistory.push('/editForm');
    }

    detail(item, a) {
        debugger
        hashHistory.push('/editForm/' + item.id);
    }

    render() {


        return (
            <div>


                <Button onClick={this.add}>新增</Button>

                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<a onClick={that.delete.bind(this, item)}>删除</a>]}>
                                <List.Item.Meta
                                    description={item.writer}
                                    title={<a onClick={this.detail.bind(this, item)}>{item.title}</a>}

                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>

        );
    }
}


export default showList