import React, { Component } from "react";
import './index.css';
import { Form, Input, Button, Layout, Space, message, Card } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { setToken } from '../../utils/auth';
import { loginApi } from '../../API/auth'

import logo from "../../graphs/logo.png";
const { Footer,Content } = Layout;
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			password: ''
		};
	}
	
	trylogin = () => {
		let loginInfo = {
			id: this.state.id,
			password: this.state.password
		};
		console.log(loginInfo);
		
		if ((loginInfo.id === '') | (loginInfo.password === '')) {
			message.error('员工编号和密码不能为空');
		} else {
			loginApi(loginInfo).then(
				(response) => {
					console.log(response.data);
					if (response.data.result === 'success') {
						message.success('登录成功');
						//这里我有问题！！！！
						setToken(JSON.stringify(response.data.user));
						this.props.history.push({   //链接跳转
							pathname: '/Home',
							//user_id出现在哪里啊？
							state: { user_id: loginInfo.id }
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

	// 当员工id发生改变
	onInputChangeid(e) {
		let inputValue = e.target.value;
		this.setState({
			id: inputValue
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
					<Card
						bordered={false}
					>
					<Form>
						<Form.Item
						name="id"
						rules={[
							{
							required: true,
							message: '请输入员工编号!'
							},
						]}
						>
							<Input
							prefix={<UserOutlined/>}
							onChange={(e) => this.onInputChangeid(e)}
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
						<Form.Item >
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button htmlType="reset">
							Reset
						</Button>
						</Form.Item>
					</Form>
					</Card>
				</div>
				</Content>
						<Footer className="footer">2019级 系统分析与设计课程设计 Copyright © 2022 MIS Group 3</Footer>
			</Layout>
		);
	}
}
