import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class EditEmployee extends Component {
    constructor(props) {
        super(props);
        const { handleEditClick } = this.props;
        this.handleEditClick = handleEditClick;
        this.state = { visible: false };
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
        const { employee } = this.props;
        employee.phone = employee.phone === '未知' ? null : employee.phone;
        employee.email = employee.email === '未知' ? null : employee.email;
        console.log(employee);
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    onFinish = (value) => {
        this.handleEditClick(value);
        this.onClose();
    };

    render() {
        const { employee } = this.props;
        return (
            <div>
                <Button type="link" onClick={this.showDrawer} size="small" icon={<EditOutlined />}>
                    编辑
                </Button>
                <Drawer
                    title="修改员工信息"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="userID" label="账号" initialValue={employee.userID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="userName"
                                    label="姓名"
                                    initialValue={employee.userName}
                                    rules={[{ required: true, message: '请输入姓名' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>

                            <Col span={12}>
                                <Form.Item name="gender" label="性别" initialValue={employee.gender}>
                                    <Select placeholder="可选项">
                                        <Option value="1">女</Option>
                                        <Option value="0">男</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="身份" initialValue={employee.status}>
                                    <Select>
                                        <Option value="1">管理员</Option>
                                        <Option value="0">员工</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="phone" label="电话" initialValue={employee.phone} rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="email" label="邮箱" initialValue={employee.email} rules={[{ type: 'email', message: '请输入正确的邮箱' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24} />

                        <Form.Item>
                            <div
                                style={{
                                    textAlign: 'right'
                                }}
                            >
                                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                    取消
                                </Button>
                                <Button htmlType="reset" style={{ marginRight: 8 }}>
                                    重置
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}
