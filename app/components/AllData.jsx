import {Form, Icon, Input, Button, Cascader} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
import {login} from "../fetch/data"
var that;
import {hashHistory} from 'react-router'
import {getData, postData} from '../fetch/test.js'
require('antd/dist/antd.css') ;
/**
 * 这里加上redux来判断是否登录状态，但是考虑学习时间成本，无奈去掉
 */
class AllDataForm extends React.Component {


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
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        function onChange(value) {
            console.log(value);
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Cascader options={options} onChange={onChange} placeholder="Please select"/>
                    )}
                </FormItem>


                <FormItem>

                    <Button type="primary" htmlType="submit">
                        提交信息
                    </Button>

                </FormItem>
            </Form>



        );
    }
}

const WrappedNormalAllDataForm = Form.create()(AllDataForm);

export default WrappedNormalAllDataForm