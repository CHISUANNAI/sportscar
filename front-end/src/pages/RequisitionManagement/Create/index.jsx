import React, { useState } from 'react'
import { Form, Button, Col, Row, Input, Select, DatePicker, message } from 'antd'
// import 'antd/dist/antd.css'
import { AddQuatationRequest } from '../../../API/auth';
const UserForm = () => {
    const [contacts, setContacts] = useState([{ supplierID: '', materialID: '', amount: '', date_limit: '' }])
    const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
    const [form] = Form.useForm()
    const submitForm = () => {
        form.validateFields()
            .then(values => {
                values.contacts.forEach((item) => item.date_limit = item.date_limit._d);
                console.log(values.contacts);
            })
    }
    const onFinish = () => {
        form.validateFields()
            .then(values => {
                let va = {
                    supplierID: [],
                    materialID: [],
                    amount: [],
                    date_limit: [],
                }
                var date = new Date();
                values.contacts.forEach((item) => {
                    if (date > item.date_limit._d) {
                        return message.warn("截止日期不能早于今日日期！")
                    };
                    item.date_limit = item.date_limit._d;
                    va.supplierID.push(item.supplierID);
                    va.materialID.push(item.materialID);
                    va.amount.push(item.amount);
                    va.date_limit.push(item.date_limit);
                }
                );
                console.log(values.contacts);
                console.log(va);
                AddQuatationRequest(va).then(
                    (response) => {
                        if (response.data.status === 200) {
                            message.success('订单创建成功');
                            form.current?.resetFields();
                            this.handleCreateClick();
                        } else {
                            message.info(response.data.desc);
                        }
                    },
                    (error) => {
                        console.log('数据获取失败', error);
                    }
                );
            })
    };
    const add = () => {
        form.setFieldsValue({ "contacts": [...contacts, { supplierID: '', materialID: '', amount: '', date_limit: '' }] })
        return setContacts([...contacts, { supplierID: '', materialID: '', amount: '', date_limit: '' }])
    }
    const del = (index) => {
        form.setFieldsValue({ "contacts": [...contacts.slice(0, index), ...contacts.slice(index + 1)] })
        return setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1)])
    }
    const onChange = (index, name, event) => {
        let tempArray = [...contacts];
        if ('supplierID' === name)
            tempArray[index] = { ...tempArray[index], supplierID: event.target.value }
        else if ('materialID' === name)
            tempArray[index] = { ...tempArray[index], materialID: event.target.value }
        else if ('amount' === name)
            tempArray[index] = { ...tempArray[index], amount: event.target.value }
        else
            tempArray[index] = { ...tempArray[index], date_limit: event.target?.value }
        return setContacts(tempArray)
    }
    const contactsItems = contacts.map((item, index) => {
        return <Row gutter={24} key={index}>
            <Col span={5}>
                <Form.Item label="供应商标识号" name={['contacts', index, 'supplierID']} rules={[{ required: true, message: '请输入供应商标识号' }]}><Input onChange={(event) => onChange(index, 'supplierID', event)} /></Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item label="物料编号" name={['contacts', index, 'materialID']} rules={[{ required: true, message: '请输入物料编号' }]}><Input onChange={(event) => onChange(index, 'materialID', event)} /></Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item label="数量" name={['contacts', index, 'amount']} rules={[{ required: true, message: '请输入数量' }]}><Input onChange={(event) => onChange(index, 'amount', event)} /></Form.Item>
            </Col>
            {/* <Col span={6}>
					<Form.Item label="materialID" name={['contacts',index,'materialID']} rules={[{  required: true,message: '请输入' }]}><Input onChange={(event)=>onChange(index,'materialID',event)}/></Form.Item>
				</Col> */}
            <Col span={5}>
                <Form.Item name={['contacts', index, 'date_limit']} label="截止日期" rules={[{ required: true, message: '请输入正确日期' }]}>
                    <DatePicker onChange={(event) => onChange(index, 'date_limit', event)} />
                </Form.Item>
            </Col>
            <Col span={3} offset={1}>
                <Button type="primary" onClick={() => del(index)}>-</Button>
            </Col>
        </Row>
    })
    return <Row>
        <Col>
            <Form name="user_form" form={form} layout={'horizontal'} onFinish={onFinish} initialValues={{ contacts: contacts }}>
                <Form.Item>
                {contactsItems}
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={add} style={{ marginRight: 8 }}>+</Button>
                    <Button type="primary" htmlType='submit'>submit</Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}
export default UserForm