import { Form, Button, Col, Row, Input, Select, message } from 'antd';
import React, { Component } from 'react';
//import { Employeeadd } from '../../../services/auth';
const { Option } = Select;

export default class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        const { handleCreateClick } = this.props;
        this.handleCreateClick = handleCreateClick;
    }
    formRef = React.createRef();
    onFinish = (values) => {
        // Employeeadd(values).then(
        // 	(response) => {
        // 		if (response.data.result === 'success') {
        // 			message.success('账号' + response.data.employee_id + '已创建成功');
        // 			this.formRef.current.resetFields();
        // 			this.handleCreateClick();
        // 		} else {
        // 			message.info('提交失败，请重试');
        // 		}
        // 	},
        // 	(error) => {
        // 		console.log('数据获取失败', error);
        // 	}
        // );
        console.log(values)
    };

    render() {
        return (
            <Form layout="vertical" hideRequiredMark onFinish={this.onFinish} ref={this.formRef}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="userID" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                            <Input placeholder="必填项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
						<Form.Item name="gender" label="性别">
							<Select placeholder="可选项">
								<Option value="1">女</Option>
								<Option value="0">男</Option>
							</Select>
						</Form.Item>
					</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="telephone" label="手机号" rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="mail" label="邮箱" rules={[{ type: 'email', message: '请输入正确的邮箱' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <text style={{color:'#f56a00'}}>&nbsp;&nbsp; 初始登录密码：000000</text>
                </Row>
                <Row gutter={24} />





                <Form.Item>
                    <div
                        style={{
                            textAlign: 'right'
                        }}
                    >
                        <Button htmlType="reset" style={{ marginRight: 8 }}>
                            重置
                        </Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </div>
                </Form.Item>
            </Form >
        );
    }
}
