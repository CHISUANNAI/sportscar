import { Form, Button, Col, Row, Input, Select, message } from 'antd';
import React, { Component } from 'react';
import { Supplieradd, Employeelist } from '../../../API/auth';

const { Option } = Select;


const renderOption = (arr , code , name) => arr ?  arr.map( (item,index)=>{
    return (<Option key={index+item[code]} value={ typeof(item[code]) === 'number' ? item[code].toString() : item[code]}>{item[name]}</Option>)
  }) : null

export default class CreateSupplier extends Component {
    constructor(props) {
        super(props);
        const { handleCreateClick } = this.props;
        this.handleCreateClick = handleCreateClick;
    }
    state = {
        dataSource: []
    };
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
    formRef = React.createRef();
    onFinish = (values) => {
        Supplieradd(values).then(
            (response) => {
                if (response.data.state === 200) {
                    message.success('供应商' + response.data.data.supplierName + '已创建成功');
                    this.formRef.current.resetFields();
                    this.handleCreateClick();
                } else if (response.data.state === 6002) {
                    message.info('员工编号不存在')
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
                        <Form.Item name="clerkVendor" label="本公司对应员工编号" rules={[{ pattern: /^\d{4}$/, message: '请输入正确的员工编号' }]}>
                        <Select placeholder="可选项">{renderOption(this.state.dataSource,'userID','userID')}</Select>
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
