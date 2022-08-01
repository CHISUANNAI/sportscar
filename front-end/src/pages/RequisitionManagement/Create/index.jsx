import { Form, Button, Col, Row, Input, Select, DatePicker,message } from 'antd';
import React, { Component } from 'react';
//import { Quotation_request } from '../../../services/auth';
const { Option } = Select;
const { RangePicker } = DatePicker;
export default class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        const { handleCreateClick } = this.props;
        this.handleCreateClick = handleCreateClick;
    }
    formRef = React.createRef();
    onFinish = (values) => {
        // Quotation_request(values).then(
        // 	(response) => {
        // 		if (response.data.result === 'success') {
        // 			message.success('订单创建成功');
        // 			this.formRef.current.resetFields();
        // 			this.handleCreateClick();
        // 		} else {
        // 			message.info('创建失败，请重试');
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
                        <Form.Item name="userID" label="用户编号" rules={[{  message: '请输入用户编号' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name="rfqID" label="报价请求单号" rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,required: true, message: '请输入请求单号' }]}>
                            <Input placeholder="必填项" />
                        </Form.Item>
					</Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="supplierID" label="供应商标识码" rules={[{required: true, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入供应商标识码' }]}>
                            <Input placeholder="必填项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="supplierName" label="供应商名称" rules={[{ message: '请输入供应商名称' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                </Row>               
                <Row gutter={24} />
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="materialID" label="物料单号" rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入物料单号' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="amount" label="物料总量" rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入物料总量' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                </Row>               
                <Row gutter={24} />

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="price" label="物料价格" rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入物料价格' }]}>
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="date" label="当前日期" rules={[{  message: '请输入正确日期' }]}>
                        <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>               
                <Row gutter={24} />
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="date_limit" label="报价期限" rules={[{  message: '请输入正确期限' }]}>
                        <DatePicker />
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
