import {Form, Icon, Input, Button, Cascader} from 'antd';
import ReactDOM from 'react-dom'
import React from 'react'
const FormItem = Form.Item;
import {login} from "../fetch/data"
var that;
import {hashHistory} from 'react-router'
import {getData, postData} from '../fetch/test.js'
require('antd/dist/antd.css');
import {get} from '../fetch/get.js'
/**
 * 这里加上redux来判断是否登录状态，但是考虑学习时间成本，无奈去掉
 */
class AllDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isShow: true
        }
    }

    handleSubmit(e) {

        e.preventDefault();
        that.props.form.validateFields((err, values) => {
            debugger
            if (!err) {
                debugger
                let username = that.props.form.getFieldValue("userName");
                var cangshu = ""
                for (var i = 0; i < username.length; i++) {
                    cangshu = cangshu + "codes=" + username[i];
                    if(i!=username.length-1)
                    {
                        cangshu=cangshu+"&"
                    }

                }
                var result = get("http://localhost:8090/school-notice/user/allData?" + cangshu)
                result.then(res => {
                    return res.text()
                }).then(text => {
                    debugger
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
        });
    }


    componentDidMount() {
        that = this;
        var result = get("http://localhost:8090/school-notice/user/getTree")

        result.then(res => {

            return res.text()
        }).then(text => {
            debugger
            let temp = JSON.parse(text);

            this.setState({data: temp.backData});


        })
    }

    render() {

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
                        <Cascader options={this.state.data} onChange={onChange} placeholder="Please select"
                                  changeOnSelect/>
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