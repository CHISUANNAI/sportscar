import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class EditMaterial extends Component {
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
        const { material } = this.props;
        material.description = material.description === '未知' ? null : material.description;
        material.weight = material.weight === '未知' ? null : material.weight;
        material.factory = material.factory === '未知' ? null : material.factory;
        console.log(material);
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
        const { material } = this.props;
        return (
            <div>
                <Button type="link" onClick={this.showDrawer} size="small" icon={<EditOutlined />}>
                    编辑
                </Button>
                <Drawer
                    title="修改物料信息"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="materialID" label="物料编码" initialValue={material.materialID}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="materialName"
                                    label="物料名称"
                                    initialValue={material.materialName}
                                    rules={[{ required: true, message: '请输入物料名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="简单描述"
                                    initialValue={material.description}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="weight" label="毛重" initialValue={material.weight} rules={[{ pattern: /^\d*\.\d*$/, message: '请输入正浮点数' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="factory" label="工厂" initialValue={material.factory}>
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
