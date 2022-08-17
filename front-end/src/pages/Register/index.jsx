import React, { Component, useState} from "react";
import './register.css';
import { Form, Input, Button, Layout, Steps, message, Col, Row, Select,Space} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone,MailOutlined,PhoneOutlined} from '@ant-design/icons';
import { registerApi } from '../../API/auth'
import { setToken } from "../../utils/auth";
/* import logo from "../../graphs/logo.png";
import Avatar from "antd/lib/avatar/avatar";
 */

const { Option } = Select;
const { Footer,Content } = Layout;


export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
            phone:'',
            email:'',
            gender:'',
		};
	}
    formRef = React.createRef();
	
    
    onNameChange(e) {
		let inputValue = e.target.value;
		this.setState({
			name: inputValue
		});
	}

    onPwChange(e) {
		let inputValue = e.target.value;
		this.setState({
			password: inputValue
		});
	}

    onGenderChange(e) {
		this.setState({
			gender: e
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

    
	tryregister = () => {
		let registerInfo = {
			name: this.state.name,
			password: this.state.password,
            gender: (this.state.gender === '0') ? 0 : (this.state.gender === '1') ? 1 : null,
            phone: (this.state.phone === '' || this.state.phone === null) ? null : this.state.phone,
            email: (this.state.email === '' || this.state.email === null) ? null : this.state.email,
		};
		if ((registerInfo.name === '') | (registerInfo.pw === '')) {
            console.log(this.state)
			message.error('员工姓名和密码不能为空');
		} else {
			registerApi(registerInfo).then(
				(response) => {
					console.log(response.data);
					if (response.data.state === 200) {
						message.success('注册成功');
						setToken(JSON.stringify(response.data.data));
						this.props.history.push({   //链接跳转
							pathname: '/Home',
						});
					} else if (response.data.state === 4000){
                        message.info('用户名已被占用');
                    } else if (response.data.state === 5000){
                        message.info('注册时出现异常');
                    } else {
						message.info('注册失败，请重试');
					}
				},
				(error) => {
					console.log('数据获取失败', error);
				}
			);
		}
	};


    render(){
        return(
            <Layout className="bg">
                <Content>
                    <Form className="register-form" 
                    labelCol={{span: 4}}>

                        {/* userName */}
                        <Form.Item
                        name="name"
                        label='姓名'
                        rules={[
                            {
                            required: true,
                            message: '请输入您的姓名!'
                            },
                        ]}
                        >
                            <Input
                            prefix={<UserOutlined/>}
                            onChange={(e) => this.onNameChange(e)}
                            maxLength={10}
                            />
                        </Form.Item>
                        
                        {/* 密码 */}
                        <Form.Item
                        name='pw'
                        label='密码'
                        rules={[
                            {
                            required: true,
                            message: '请输入密码!'
                            },
                        ]}>
                            <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => this.onPwChange(e)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="请再次输入新密码"
                            dependencies={['pw']}
                            hasFeedback
                            rules={[
                                {
                                required: true,
                                message: '请确认新密码！',
                                },
                                ({ getFieldValue }) => ({
                                validator(_, value) {
                                    //空or两次密码相同
                                    if (!value || getFieldValue('pw') === value) {
                                    return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('您所输入的两次密码不同，请重新输入！'));
                                },
                                }),
                            ]}
                            >
                            <Input.Password />
                         </Form.Item>

                        {/* //Gender */}
                        <Form.Item
                            name="gender"
                            label="性别"
                        >
                            <Select
                            placeholder="性别"
                            allowClear
                            onChange={(e) => this.onGenderChange(e)}
                            >
                            <Option value="0">女</Option>
                            <Option value="1">男</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                        name="phone"
                        label='电话'
                        rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }]}>
                            <Input
                            prefix={<PhoneOutlined/>}
                            onChange={(e) => this.onPhoneChange(e)}
                            />
                        </Form.Item>

                        <Form.Item
                        name="email"
                        label='邮箱'
                        rules={[{ type: 'email', message: '请输入正确的邮箱' }]}>
                            <Input
                            prefix={<MailOutlined/>}
                            onChange={(e) => this.onEmailChange(e)}
                            />
                        </Form.Item>

                        {/* 提交与重置按钮 */}
                        <Form.Item>
                        <Row gutter={5}>
                            <Col className="gutter-row" span={6} offset={8}>
                                <Button type="primary" htmlType="submit" onClick={this.tryregister}>
                                提交
                                </Button>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Button htmlType="reset">
                                清空
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
