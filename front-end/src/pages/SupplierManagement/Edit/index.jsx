import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class EditSupplier extends Component {
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
        const { supplier } = this.props;
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
                            <Col span={24}>
                                <Form.Item name="supplierID" label="供应商标识码" initialValue={supplier.supplierID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="supplierName"
                                    label="供应商名称"
                                    initialValue={supplier.supplierName}
                                    rules={[{ required: true, message: '请输入供应商名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="clerk_vendor"
                                    label="本公司对应员工编号"
                                    initialValue={supplier.clerk_vendor}
                                    rules={[{ pattern: /^\d{5}$/, message: '请输入正确的员工编号' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="region" label="供应商地址" initialValue={supplier.region}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="language" label="沟通语言" initialValue={supplier.language}>
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
