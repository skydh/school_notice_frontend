import {Form, Icon, Input, Button, Checkbox} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
var that;
import {hashHistory} from 'react-router'
import {get} from '../fetch/get.js'
import {registerFun} from "../fetch/data"
class DetailShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            writer: "",
            content: "",
        }
    }

    componentDidMount() {
        const id = this.props.params.id
        that = this;
        var result = get("http://localhost:8090/school-notice/notice/queryDetail?id=" + id)
        result.then(res => {
            return res.text()
        }).then(text => {
            debugger
            let temp = JSON.parse(text);
            var date = new Date(temp.backData.writeDate);
            let writer = temp.backData.writer + "---" + date.toLocaleDateString()
            this.setState({
                title: temp.backData.title,
                writer: writer,
                content: temp.backData.contents,


            });
        })
    }

    render() {
        const id = this.props.params.id;
        return (

            <div>
                <div>{this.state.title}</div>
                <div>{this.state.writer}</div>
                <div>{this.state.content}</div>
            </div>
        );
    }
}


export default DetailShow