import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Employeelist } from '../../../API/auth';

const { Option } = Select;
const renderOption = (arr, code, name) => arr ? arr.map((item, index) => {
    return (<Option key={index + item[code]} value={typeof (item[code]) === 'number' ? item[code].toString() : item[code]}>{item[name]}</Option>)
}) : null

export default class EditSupplier extends Component {
    constructor(props) {
        super(props);
        const { handleEditClick } = this.props;
        this.handleEditClick = handleEditClick;
        this.state = { visible: false, dataSource: [] };
    }

    componentDidMount() {
        Employeelist().then(
            (response) => {
                //拿到我们想要渲染的数据(res)
                this.setState({
                    dataSource: response.data.data
                });
                console.log(response.data.data);
            },
            (error) => {
                console.log('失败了', error);
            }
        );
    }


    showDrawer = () => {
        this.setState({
            visible: true
        });
        const { supplier } = this.props;
        supplier.region = supplier.region === '未知' ? null : supplier.region;
        supplier.language = supplier.language === '未知' ? null : supplier.language;
        supplier.clerkVendor = supplier.clerkVendor === '未知' ? null : supplier.clerkVendor;
        console.log(supplier);
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
                    title="修改供应商信息"
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
                                    name="clerkVendor"
                                    label="本公司对应员工编号"
                                    initialValue={supplier.clerkVendor}
                                    rules={[{ pattern: /^\d{4}$/, message: '请输入正确的员工编号' }]}>
                                    <Select placeholder="可选项">{renderOption(this.state.dataSource, 'userID', 'userID')}</Select>
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
