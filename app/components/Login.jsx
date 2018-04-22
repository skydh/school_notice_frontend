import {Form, Icon, Input, Button, Checkbox,} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
import {login} from "../fetch/data"
var that;
import {hashHistory} from 'react-router'
import {getData, postData} from '../fetch/test.js'
/**
 * 这里加上redux来判断是否登录状态，但是考虑学习时间成本，无奈去掉
 */
class NormalLoginForm extends React.Component {


    handleSubmit(e) {

        e.preventDefault();
        that.props.form.validateFields((err, values) => {
            if (!err) {
                let username = that.props.form.getFieldValue("userName");
                let password = that.props.form.getFieldValue("password");
                let url = "user/login?username=" + username + "&password=" + password
                login(url)
            }
        });
    }

    registerfun() {
        hashHistory.push('/register');
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
                        登录
                    </Button>
                    Or <Button onClick={this.registerfun}>注册!</Button>
                </FormItem>
            </Form>



        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm