import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
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
                                <Form.Item name="userID" label="用户编号" initialValue={employee.userID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="rfqID" label="报价请求单号" initialValue={employee.rfqID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="supplierID" label="供应商标识码" initialValue={employee.supplierID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="supplierName" label="供应商名称" initialValue={employee.supplierName}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="materialID" label="物料单号" initialValue={employee.materialID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="amount" label="物料总量" initialValue={employee.amount} rules={[{ message: '请输入物料总量' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="物料价格"
                                    initialValue={employee.price}
                                    rules={[{ message: '请输入姓名' }]}
                                ><Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="date"
                                    label="当前时间"
                                    initialValue={employee.date}
                                    rules={[{ required: true, message: '请输入当前时间' }]}
                                > <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="date_limit"
                                    label="报价期限"
                                    initialValue={employee.date_limit}
                                    rules={[{ required: true, message: '请输入报价期限' }]}
                                > <DatePicker />
                                </Form.Item>
                            </Col>

                        </Row>

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
