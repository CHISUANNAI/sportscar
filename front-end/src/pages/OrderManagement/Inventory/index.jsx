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
                    订单详情
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
                            小订单编号：{material.sub_orderID}
                            </Col>
                            <Col span={12}>
                            大订单编号：{material.orderID}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                            报价请求单号：{material.rfqID}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                            供应商编号：{material.supplierID}
                            </Col>
                            <Col span={12}>
                            用户编号：{material.userID}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                            物料总量：{material.amount}
                            </Col>
                            <Col span={12}>
                            物料编号：{material.materialID}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                            小订单金额：{material.price}
                            </Col>
                           
                        </Row>
                        <Row gutter={24} />
                    </Form>
                </Drawer>
            </div>
        );
    }
}
