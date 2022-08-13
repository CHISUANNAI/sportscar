import React, { Component, useState} from "react";
import './register.css';
import { Form, Input, Button, Layout, Steps, message, Col, Row, Select,Space} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone,MailOutlined,PhoneOutlined} from '@ant-design/icons';
//import { loginApi } from '../../API/auth'
/* import logo from "../../graphs/logo.png";
import Avatar from "antd/lib/avatar/avatar";
 */

const { Option } = Select;
const { Footer,Content } = Layout;
const { Step } = Steps;
const steps = [
  {
    title: '基础信息',
    content: 'First-content',
  },
  {
    title: '密码设置',
    content: 'Second-content',
  },
];


export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
            phone:'',
            email:'',
            gender:'',
            avatar:'',
        
		};
	}
	
    
    onNameChange(e) {
		let inputValue = e.target.value;
		this.setState({
			name: inputValue
		});
	}

    onGenderChange(e) {
		let inputValue = e.target.value;
		this.setState({
			gender: inputValue
		});
	}

    onPhoneChange(e) {
		let inputValue = e.target.value;
		this.setState({
			phone: inputValue
		});
	}

    onEmailChange(e) {
		let inputValue = e.target.value;
		this.setState({
			email: inputValue
		});
	}

    /* //尝试注册
	tryregister = () => {
		let registerInfo = {
			name: this.state.name,
			password: this.state.password
		};
		if ((loginInfo.name === '') | (loginInfo.password === '')) {
			message.error('员工名称和密码不能为空');
		} else {
			loginApi(loginInfo).then(
				(response) => {
					console.log(response.data.result);
					if (response.data.result === 'success') {
						message.success('登录成功');
						setToken(JSON.stringify(response.data.user));
						this.props.history.push({   //链接跳转
							pathname: '/Home',
						});
					} else {
						message.info('登录失败，请重试');
					}
				},
				(error) => {
					console.log('数据获取失败', error);
				}
			);
		}
	}; */

	

    render(){
        return(
            <Layout className="bg">
                <Content>
                    <Form className="register-form" 
                    labelCol={{span: 4}}>

                        {/* userName */}
                        <Form.Item
                        name="name"
                        label='Name'
                        rules={[
                            {
                            required: true,
                            message: '请输入员工名称!'
                            },
                        ]}
                        >
                            <Input
                            prefix={<UserOutlined/>}
                            onChange={(e) => this.onNameChange(e)}
                            />
                        </Form.Item>
                        
                        {/* 密码 */}
                        <Form.Item
                        label='Password'
                        rules={[
                            {
                            required: true,
                            message: '请输入密码!'
                            },
                        ]}>
                            <Space direction="vertical">
                                <Input.Password placeholder="input password" />
                                <Input.Password
                                placeholder="input password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Space>
                        </Form.Item>

                        {/* //Gender */}
                        <Form.Item
                            name="gender"
                            label="Gender"
                        >
                            <Select
                            placeholder="性别"
                            onChange={(e) => this.onGenderChange(e)}
                            allowClear
                            >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                        name="phone"
                        label='Phone'>
                            <Input
                            prefix={<PhoneOutlined/>}
                            onChange={(e) => this.onPhoneChange(e)}
                            />
                        </Form.Item>

                        <Form.Item
                        name="email"
                        label='Email'>
                            <Input
                            prefix={<MailOutlined/>}
                            onChange={(e) => this.onEmailChange(e)}
                            />
                        </Form.Item>

                        {/* <Form.Item
                        name="gender"
                        required tooltip="This is a required field">
                            <Input
                            prefix={<UserOutlined/>}
                            onChange={(e) => this.onInputChangeName(e)}
                            />
                        </Form.Item> */}
                        
                        {/* 提交与重置按钮 */}
                        <Form.Item>
                        <Row gutter={5}>
                            <Col className="gutter-row" span={6} offset={8}>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Button htmlType="reset">
                                Reset
                                </Button>
                            </Col>
                        </Row>
                        </Form.Item>
                    </Form>   
                
                </Content>
                <Footer className="footer">2019级 系统分析与设计课程设计 Copyright © 2022 MIS Group 3</Footer>
            </Layout>
            );
    }
}
