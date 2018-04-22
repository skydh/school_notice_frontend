import {Form, Icon, Switch, Button, Cascader, Input} from 'antd';
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

            //这里为了显示好看额外加了几个字段，但是实际上没有存到数据库里面，恩，没错
            debugger
            if (!err) {
                debugger
                let username = that.props.form.getFieldValue("userCode");
                var cangshu = ""
                if (username != null) {

                    for (var i = 0; i < username.length; i++) {
                        cangshu = cangshu + "codes=" + username[i];
                        if (i != username.length - 1) {
                            cangshu = cangshu + "&"
                        }

                    }
                }else{
                    cangshu="codes="+""
                }
                var result = get("http://localhost:8090/school-notice/user/allData?" + cangshu)
                result.then(res => {
                    return res.text()
                }).then(text => {
                    debugger
                    let temp = JSON.parse(text);
                    if (temp.success) {
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
            that.setState({isShow: value});
        }

        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} >
                <FormItem label="是否为非学校注册">
                    {getFieldDecorator('userchange')(
                        <Switch defaultChecked onChange={onChange}/>
                    )}
                </FormItem>

                {
                    // 等待验证之后，再显示登录信息
                    this.state.isShow
                        ? <FormItem label="上级组织">
                        {getFieldDecorator('userCode')(
                            <Cascader options={this.state.data} placeholder="Please select"
                                      changeOnSelect/>
                        )}
                    </FormItem>
                        : <FormItem></FormItem>
                }


                <FormItem label="名称">
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '名称!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="名称"/>
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