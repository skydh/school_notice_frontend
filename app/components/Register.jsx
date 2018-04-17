import {Form, Icon, Input, Button, Checkbox} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
var that;
import {hashHistory} from 'react-router'

import {registerFun} from "../fetch/data"
class RegisterForm extends React.Component {


    handleSubmit(e) {
        debugger
        e.preventDefault();
        that.props.form.validateFields((err, values) => {
            debugger
            if (!err) {
                console.log('Received values of form: ', values);
                let username = that.props.form.getFieldValue("userName");
                let password = that.props.form.getFieldValue("password");
                let url = "user/register?username=" + username + "&password=" + password
                registerFun(url)
            } else {

            }
        });
    }

    componentDidMount() {
        that = this;
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="请输入密码"/>
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

const WrappedNormalRegisterForm = Form.create()(RegisterForm);

export default WrappedNormalRegisterForm