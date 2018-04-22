import {Form, Icon, Input, Button, Checkbox} from 'antd';
const {TextArea} = Input;
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
import {get} from '../fetch/get.js'
var that;
import {hashHistory} from 'react-router'

import {doNotice} from "../fetch/data"
class NormalEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            writer: "",
            content: "",
            id: ""


        }
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        that.props.form.validateFields((err, values) => {
            debugger
            if (!err) {

                let title = that.props.form.getFieldValue("title");
                let contents = that.props.form.getFieldValue("contents");
                if (that.state.id == "") {
                    let url = "http://localhost:8090/school-notice/notice/insert"
                    let vo = {
                        title: title,
                        contents: contents
                    }
                    doNotice(url, vo);

                } else {
                    let url = "http://localhost:8090/school-notice/notice/update"
                    let vo = {
                        title: title,
                        contents: contents,
                        id: that.state.id,
                    }
                    doNotice(url, vo);
                }

            } else {

            }
        });
    }

    componentDidMount() {
        that = this;
        const id = this.props.params.id
        if (id != null) {
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
                    id: temp.backData.id


                });
            })

        } else {

        }
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="标题">
                    {getFieldDecorator('title', {initialValue: this.state.title}, {
                        rules: [{required: true, message: '请输入标题!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="标题"/>
                    )}
                </FormItem>
                <FormItem label="文章">
                    {getFieldDecorator('contents', {initialValue: this.state.content}, {
                        rules: [{required: true, message: '请输入文章!'}],
                    })(
                        <TextArea placeholder="文章" autosize={{minRows: 20, maxRows: 30}}/>
                    )}
                </FormItem>
                <FormItem>

                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>

                </FormItem>
            </Form>



        );
    }
}

const WrappedNormalEditForm = Form.create()(NormalEditForm);

export default WrappedNormalEditForm