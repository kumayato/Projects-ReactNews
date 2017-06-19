import React from 'react';
import { Row, Col, Modal, Menu, Icon, Form, Input, Button, Tabs, message} from 'antd';

// 页面表单提交
const FormItem = Form.Item;
// tab栏
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'


class PCHeader extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisible: false,  // 模态框是否显示隐藏
            action: 'login',      // 判断用户是登录还是注册
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

    // 点击导航菜单
    handleClick(e){
        // 点击注册时，注册按钮高亮且弹出框可见
        console.log('click ', e);
        if (e.key == 'register'){
            this.setState({current: 'register'});
            this.setModelVisible(true);
        }else{
            this.setState({current: e.key,});
        }
    };

    // 注册/登录页面点击提交
    handleSubmit(e) {
        // js原生阻止事件冒泡的方法
        e.preventDefault();

        var myFetchOptions = {
            method: 'GET'
        };
        // 获取到表单的值
        var formData= this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username="+formData.userName+"&password="+formData.password
            +"&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions).
        then(response=>response.json()).then(json=>{
            console.log(json);
            this.setState({userNickName:json.NickUserName,userid:json.UserId});
            // 保存localStorage的值
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;
        });
        // 如果是登录
        if(this.state.action == 'login'){
            this.setState({hasLogined: true})
        }
        // 全局提示
        message.success("请求成功！");
        // 隐藏模态框
        this.setModelVisible(false);
    }

    // 设置模态框是否可见
    setModelVisible(params) {
        this.setState({modalVisible: params})
    };

    // 切换tab栏的回调
    callback(key){
        if(key == 1){
            this.setState({action: 'login'});
        }else if (key == 2){
            this.setState({action: 'register'});
        }
    }

    // 登出事件
    logout(){
        localStorage.userid= '';
        localStorage.userNickName = '';
        this.setState({hasLogined:false});
    };

    render(){
        // 判断用户是否登录
        // 如果已经登录显示用户昵称，没有登录显示登录/注册
        const userShow = this.state.hasLogined?
            <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank" to={`/usercenter`}>
                    <Button type="danger" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="dashed" htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>:
            <Menu.Item key="register" class="register">
                <Icon type="user" />登录/注册
            </Menu.Item>;

        // 接收弹出框表单页面参数
        const {getFieldDecorator} = this.props.form;

        return (
            <header id="header">
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        {/*logo*/}
                        <a href="#" className='logo'>
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>

                    <Col span={16}>
                        {/*导航菜单*/}
                        <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="top">
                                <i class="anticon">&#xe677;</i>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <i class="anticon">&#xe66d;</i>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <i class="anticon">&#xe65e;</i>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <i class="anticon">&#xe6f1;</i>国际
                            </Menu.Item>
                            <Menu.Item key="liyu">
                                <i class="anticon">&#xe6ef;</i>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <i class="anticon">&#xe90f;</i>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <i class="anticon">&#xe6d8;</i>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>

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
            </header>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader);
