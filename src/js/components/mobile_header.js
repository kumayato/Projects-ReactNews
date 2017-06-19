import React from 'react';
import { Row, Col, Modal, Menu, Icon, Form, Input, Button, Tabs, message} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

// 页面表单提交
const FormItem = Form.Item;
// tab栏
const TabPane = Tabs.TabPane;


class MobileHeader extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisible: false,  // 模态框是否显示隐藏
            action: 'login',      // 按钮用来做登录还是注册
            hasLogined: false,    // 用户是否已经登录
            userNickName: '',     // 用户登录的昵称
            userid: 0             // 用户的id
        }
    }

    // 只要userid不为空，那么就是登录状态，并且设置userNickName和userid；
    componentWillMount(){
        if (localStorage.userid != ''){
            this.setState({hasLogined: true});
            this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
        }
    }

    // 设置模态框是否可见
    setModelVisible(params) {
        this.setState({modalVisible: params})
    };

    // 注册/登录页面点击提交
    handleSubmit(e)
    {
        //页面开始向 API 进行提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData= this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username="+formData.userName+"&password="+formData.password
            +"&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({userNickName: json.NickUserName, userid: json.UserId});
                // 保存localStorage的值
                localStorage.userNickName = json.NickUserName;
                localStorage.userid = json.UserId;
            });
        if (this.state.action=="login") {
            this.setState({hasLogined:true});
        }
        message.success("请求成功！");
        this.setModelVisible(false);
    };

    // 登录事件
    login(){
        this.setModelVisible(true);
    };

    // 登录/注册后的回调函数
    callback(key) {
        if (key == 1) {
            this.setState({action: 'login'});
        } else if (key == 2) {
            this.setState({action: 'register'});
        }
    };

    // 登出事件
    logout(){
        localStorage.userNickName = '';
        localStorage.userid = '';
        this.setState({hasLogined:false});
    };

    render(){
        const userShow = this.state.hasLogined?
            <div class='logout'>
                <Link to={`/usercenter`}>
                    <i class="anticon user-center">&#xe65e;</i>
                </Link>
                &nbsp;&nbsp;
                <Link to={`/`}>
                    <Button type="dashed" htmlType='button' class='btn-logout' onClick={this.logout.bind(this)}>退出</Button>
                </Link>
            </div>
            :
            <i class="anticon login" onClick={this.login.bind(this)}>&#xe66a;</i>;

        // 接收弹出框表单页面参数
        const {getFieldDecorator} = this.props.form;

       return (
            <div id='mobiieHeader'>

                <header>
                    <a href="#">
                        <img src="./src/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                    {userShow}
                </header>

                {/*弹出框*/}
                <Modal title="用户中心" visible={this.state.modalVisible} onOk={ ()=>{this.setModelVisible(false)} } onCancel={ ()=>{this.setModelVisible(false)} } okText="关闭">

                    <Tabs  type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                <FormItem label="账户">
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入你的账户!' }],
                                    })(
                                        <Input type="text" placeholder="请输入你的账户"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入你的密码!' }],
                                    })(
                                        <Input type="password" placeholder="请输入你的密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">登录</Button>
                                </FormItem>
                            </Form>
                        </TabPane>

                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)} horizontal>
                                <FormItem label="账户">
                                    {getFieldDecorator('r_userName', {
                                        rules: [{ required: true, message: '请输入你的账户!' }],
                                    })(
                                        <Input type="text" placeholder="请输入你的账户"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('r_password', {
                                        rules: [{ required: true, message: '请输入你的密码!' }],
                                    })(
                                        <Input type="password" placeholder="请输入你的密码"/>
                                    )}
                                </FormItem>
                                <FormItem label="确认密码">
                                    {getFieldDecorator('r_confirmPassword', {
                                        rules: [{ required: true, message: '请再次确认密码!' }],
                                    })(
                                        <Input type="password" placeholder="请再次确认密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>

            </div>
        );
    };
}

export default MobileHeader = Form.create({})(MobileHeader);