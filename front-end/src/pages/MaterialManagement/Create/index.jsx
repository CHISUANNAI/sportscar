import { Form, Button, Col, Row, Input, Select, message } from 'antd';
import React, { Component } from 'react';
//import { Supplieradd } from '../../../services/auth';
const { Option } = Select;

export default class CreateMaterial extends Component {
    constructor(props) {
        super(props);
        const { handleCreateClick } = this.props;
        this.handleCreateClick = handleCreateClick;
    }
    formRef = React.createRef();
    onFinish = (values) => {
        // Supplieradd(values).then(
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
                        <Form.Item name="materialName" label="物料名称" rules={[{ required: true, message: '请输入物料名称' }]}>
                            <Input placeholder="必填项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="description" label="简单描述">
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="weight" label="毛重（kg）" >
                            <Input placeholder="可选项" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="factory" label="工厂" >
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