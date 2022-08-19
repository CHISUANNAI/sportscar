import React, { Component } from "react";
import './index.css';
import { Form, Input, Button, Layout, Space, message, Col, Row} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { setToken } from '../../utils/auth';
import { loginApi } from '../../API/auth'
import bgvideo from './bgvideo.mp4';



import logo from "../../graphs/logo.png";
const { Footer,Content } = Layout;

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: ''
		};
	}

	tryregister = () => {
		this.props.history.push({   //链接跳转
			pathname: '/Register',
		});
	}

	trylogin = () => {
		let loginInfo = {
			name: this.state.name,
			password: this.state.password
		};
		if ((loginInfo.name === '') | (loginInfo.password === '')) {
			message.error('员工名称或密码不能为空');
		} else {
			loginApi(loginInfo).then(
				(response) => {
					//response内容要注意！
					console.log(response.data.data); //控制台输出response内容
					console.log(loginInfo.name);
					console.log(loginInfo.password);
					//state:200表示返回成功；其他值表示失败
					if (response.data.state === 200) {
						message.success('登录成功');
						setToken(JSON.stringify(response.data.data));
						this.props.history.push({   //链接跳转
							pathname: '/Home',
						});
					} else if(response.data.state === 4001){
						message.info('用户名不存在');
					} else if(response.data.state === 4002){
						message.info('用户密码错误');
					} else {
						message.info('登录失败，请重试');
					}
				},
				(error) => {
					console.log('数据获取失败', error);
				}
			);
		}
	};

	// 当员工姓名发生改变
	onInputChangeName(e) {
		let inputValue = e.target.value;
		this.setState({
			name: inputValue
		});
	}

	// 当密码发生改变
	onInputChangepw(e) {
		let inputValue = e.target.value;
		this.setState({
			password: inputValue
		});
	}

	render() {
		return (
			<Layout className="bg">
				
				<Content>
				<video playsInline autoPlay loop muted width="100%">
					<source src={bgvideo} type='video/mp4' />
				</video>		
					<div className="login-form">
						<Form labelCol={{span: 4}}>
							<Form.Item
							label='员工姓名'
							name="name"
							rules={[
								{
								required: true,
								message: '请输入用户名称!'
								},
							]}
							>
								<Input
								prefix={<UserOutlined/>}
								onChange={(e) => this.onInputChangeName(e)}
								/>
							</Form.Item>
							<Form.Item
							label='密码'
							name="password"
							rules={[
								{
								required: true,
								message: '请输入密码！'
								}
							]}
							>
								<Input.Password
									prefix={<LockOutlined/>}
									iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
									onChange={(e) => this.onInputChangepw(e)}
								/>
							</Form.Item>
							<Form.Item>
							<Row 
								gutter={{
									xs: 8,
									sm: 16,
									md: 24,
									lg: 32,
								}}>
								<Col className="gutter-row" span={5} offset={5}>
									
										<Button type="primary" block htmlType="submit" onClick={this.trylogin}>
										登录
										</Button>
									
								</Col>
								<Col className="gutter-row" span={5}>
									
										<Button htmlType="reset" block>
										重置
										</Button>
									
								</Col>
								<Col className="gutter-row" span={5}>
									
										<Button block onClick={this.tryregister}>
										注册
										</Button>	
								
								</Col>
							</Row>
							</Form.Item>
						</Form>
					</div>
					
				</Content>
				<Footer ghost className="footer">2019级 系统分析与设计课程设计 Copyright © 2022 MIS Group 3</Footer>
			</Layout>
		);
	}
}
