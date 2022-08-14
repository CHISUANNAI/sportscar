import React, { Component } from "react";
import './index.css';
import { Form, Input, Button, Layout, Space, message, Col, Row} from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { setToken } from '../../utils/auth';
import { loginApi } from '../../API/auth'

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
					//state:200表示返回成功；500表示失败
					if (response.data.state === 200) {
						message.success('登录成功');
						//setToken(JSON.stringify(response.data.user));
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
					<div className="login-form">
						<Form>
							<Form.Item
							name="name"
							rules={[
								{
								required: true,
								message: '请输入员工名称!'
								},
							]}
							>
								<Input
								prefix={<UserOutlined/>}
								onChange={(e) => this.onInputChangeName(e)}
								/>
							</Form.Item>
							<Form.Item
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
							<Row gutter={16}>
								<Col className="gutter-row" span={3} offset={2}>
									<Button type="primary" htmlType="submit" onClick={this.trylogin}>
									Submit
									</Button>
								</Col>
								<Col className="gutter-row" span={3}>
									<Button htmlType="reset">
									Reset
									</Button>
								</Col>
								<Col className="gutter-row" span={3}>
									<Button onClick={this.trylogin}>
									Register
									</Button>
								</Col>
							</Row>
							</Form.Item>
						</Form>
					</div>
				</Content>
						<Footer className="footer">2019级 系统分析与设计课程设计 Copyright © 2022 MIS Group 3</Footer>
			</Layout>
		);
	}
}
