import React, { Component } from 'react'
import { Form, Button, Col, Row, Input, Select, DatePicker, message } from 'antd'
// import 'antd/dist/antd.css'
import { AddQuatationRequest, Supplierlist, Materiallist } from '../../../API/auth';
const { Option } = Select;
export default class Create extends React.Component {
    form = React.createRef();
    state = {
        contacts: [{ supplierID: '', materialID: '', amount: '', date_limit: '' }],
        supplierlist: [],
        supplierNameList:[],
        materiallist: [],
        materialNameList:[]
    };
    componentDidMount() {
        Supplierlist().then(
            (response) => {
                //拿到我们想要渲染的数据(res)
                var li = []
                var li1=[]
                response.data.data.map((item, index) => {
                    li.push(item.supplierID)
                    li1.push(item.supplierName)
                })
                this.setState({
                    supplierlist: li,
                    supplierNameList:li1
                })

            },
            (error) => {
                console.log("出错了", error);
            }
        )
        Materiallist().then(
            (response) => {
                //拿到我们想要渲染的数据(res)
                var li = []
                var li1=[]
                response.data.data.map((item, index) => {
                    li.push(item.materialID)
                    li1.push(item.materialName)
                })
                this.setState({
                    materiallist: li,
                    materialNameList: li1,
                })

            },
            (error) => {
                console.log("出错了", error);
            }
        )
        // ShowAllQuatationRequest().then(
        // 	(response) => {
        // 		//拿到我们想要渲染的数据(res)
        // 		this.setState({
        // 			dataSource: response.data.data
        // 		});
        // 		// console.log(state.dataSource)
        // 	},
        // 	(error) => {
        // 		console.log("出错了",error);
        // 	}
        // );
    }


    formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

    onSearch = (value) => {
        console.log('search:', value);
    };
    submitForm() {
        this.form.validateFields()
            .then(values => {
                values.contacts.forEach((item) => item.date_limit = item.date_limit._d);
                console.log(values.contacts);
            })
    }
    onFinish = () => {
        this.form.current.validateFields()
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
                AddQuatationRequest(va).then(
                    (response) => {
                        if (response.data.status === 200) {
                            message.success('订单创建成功');
                            this.form.current?.resetFields();
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
    add = () => {
        this.form.current.setFieldsValue({ "contacts": [...this.state.contacts, { supplierID: '', materialID: '', amount: '', date_limit: '' }] })
        this.setState({
            contacts: [...this.state.contacts, { supplierID: '', materialID: '', amount: '', date_limit: '' }],
        })
    }
    del = (index) => {
        this.form.current.setFieldsValue({ "contacts": [...this.state.contacts.slice(0, index), ...this.state.contacts.slice(index + 1)] })
        this.setState({
            contacts: [...this.state.contacts.slice(0, index), ...this.state.contacts.slice(index + 1)],
        })
    }
    onChange = (index, name, event) => {
        let tempArray = [...this.state.contacts];
        if ('supplierID' === name)
            tempArray[index] = { ...tempArray[index], supplierID: event.target?.value }
        else if ('materialID' === name)
            tempArray[index] = { ...tempArray[index], materialID: event.target?.value }
        else if ('amount' === name)
            tempArray[index] = { ...tempArray[index], amount: event.target?.value }
        else
            tempArray[index] = { ...tempArray[index], date_limit: event.target?.value }
        this.setState({
            contacts: tempArray,
        })
    }
    print() {
        console.log("wuhu")
        console.log(this.form.current)
    }
    // getdata


    render() {

        return (<Row>
            <Col>
                <Form style={{ width: 1200 }} name="user_form" ref={this.form} layout={'horizontal'} onFinish={this.onFinish} initialValues={{ contacts: this.state.contacts }}>
                    <Form.Item>
                        {this.state.contacts.map((item, index) => {
                            return (<Row gutter={24} key={index} >
                                {/* <Col span={5}>
                <Form.Item label="供应商标识号" name={['contacts', index, 'supplierID']} rules={[{ required: true, message: '请输入供应商标识号' }]}><Input onChange={(event) => onChange(index, 'supplierID', event)} /></Form.Item>
            </Col> */}
                                <Col span={5}>
                                    <Form.Item label="供应商标识号" name={['contacts', index, 'supplierID']} rules={[{ required: true, message: '请输入供应商标识号' }]}><Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={(event) => this.onChange(index, 'supplierID', event)}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {this.state.supplierlist.map((item, index) => {
                                            return <Option value={item} key={'su'+index}>{item+"  "+this.state.supplierNameList[index]}</Option>
                                        })}
                                    </Select></Form.Item>
                                </Col>
                                {/* <Col span={5}>
                <Form.Item label="物料编号" name={['contacts', index, 'materialID']} rules={[{ required: true, message: '请输入物料编号' }]}><Input onChange={(event) => onChange(index, 'materialID', event)} /></Form.Item>
            </Col> */}
                                <Col span={5}>
                                    <Form.Item label="物料编号" name={['contacts', index, 'materialID']} rules={[{ required: true, message: '请输入物料编号' }]}><Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={(event) => this.onChange(index, 'materialID', event)}
                                        onSearch={this.onSearch}
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                         {this.state.materiallist.map((item, index) => {
                                            return <Option value={item} key={'mo'+index}>{item+"  "+this.state.materialNameList[index]}</Option>
                                        })}
                                    </Select></Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label="数量" name={['contacts', index, 'amount']} rules={[{ required: true, message: '请输入数量' }]}><Input onChange={(event) => this.onChange(index, 'amount', event)} /></Form.Item>
                                </Col>
                                {/* <Col span={6}>
					<Form.Item label="materialID" name={['contacts',index,'materialID']} rules={[{  required: true,message: '请输入' }]}><Input onChange={(event)=>onChange(index,'materialID',event)}/></Form.Item>
				</Col> */}
                                <Col span={5}>
                                    <Form.Item name={['contacts', index, 'date_limit']} label="截止日期" rules={[{ required: true, message: '请输入正确日期' }]}>
                                        <DatePicker onChange={(event) => this.onChange(index, 'date_limit', event)} />
                                    </Form.Item>
                                </Col>
                                <Col span={3} offset={1}>
                                    <Button type="primary" onClick={() => this.del(index)}>-</Button>
                                </Col>
                            </Row>)
                        })}
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.add} style={{ marginRight: 8 }}>+</Button>
                        <Button type="primary" htmlType='submit'>submit</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>)
    }
}
