import { Form, Button, Col, Row, Input, Select, message } from 'antd';
import React, { Component } from 'react';
import { Supplieradd } from '../../../API/auth';
const { Option } = Select;

export default class CreateSupplier extends Component {
    constructor(props) {
        super(props);
        const { handleCreateClick } = this.props;
        this.handleCreateClick = handleCreateClick;
    }
    formRef = React.createRef();
    onFinish = (values) => {
        Supplieradd(values).then(
            (response) => {
                if (response.data.state === 200) {
                    message.success('供应商' + response.data.data.supplierName + '已创建成功');
                    this.formRef.current.resetFields();
                    this.handleCreateClick();
                } else {
                    message.info(response.data.message);
                }
            },
            (error) => {
                console.log('数据获取失败', error);
            }
        );
        console.log(values)
    };

    render() {
        return (
            <Form layout="vertical" hideRequiredMark onFinish={this.onFinish} ref={this.formRef}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="supplierName" label="供应商名称" rules={[{ required: true, message: '请输入姓名' }]}>
                            <Input placeholder="必填项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="clerk_vendor" label="本公司对应员工编号" rules={[{ pattern: /^\d{5}$/, message: '请输入正确的员工编号' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="region" label="供应商地址" >
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="language" label="沟通语言" >
                            <Input placeholder="可选项" />
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
