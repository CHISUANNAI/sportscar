import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { LineChartOutlined } from '@ant-design/icons';


export default class MaterialInventory extends Component {
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
        const { material } = this.props;
        return (
            <div>
                <Button type="link" onClick={this.showDrawer} size="small" icon={<LineChartOutlined />}>
                    库存
                </Button>
                <Drawer
                    title="物料库存详情"
                    width={800}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
                        <Row gutter={24}>
                            <Col span={12}>
                                物料编号：{material.materialID}
                            </Col>
                            <Col span={12}>
                                物料名称：{material.materialName}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                简单描述：{material.description}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                毛重：{material.weight}
                            </Col>
                            <Col span={12}>
                                工厂：{material.factory}
                            </Col>
                        </Row>
                        <Row gutter={24} />
                    </Form>
                </Drawer>
            </div>
        );
    }
}
