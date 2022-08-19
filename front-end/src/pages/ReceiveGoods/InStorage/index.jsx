import React, { Component } from "react";
import { Row,Col,Form,Table,Input, Button, Space, Divider, Popconfirm, message,Select } from 'antd';
import Highlighter from 'react-highlight-words';
import {getOrderStatus,receiveProduct} from '../../../API/ReceiveGoods';
import { CheckCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
export default class ReceiveGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', dataSource:[],
    location:['TG00','SD00','MI00'],
    selectlocation:'TG00',
    orderID:''
  };
  }
  handleChange = (value) => {
    this.state.selectlocation=value;
    console.log(this.state.selectlocation)
  };
  handleReceive= (values) => {
   
    receiveProduct(this.state.orderID,values.subOrderID,this.state.selectlocation).then(
      (response) => {
        if(response.data.status==500)
        message.error(response.data.desc);
        else if(response.data.status==200){
          message.success(response.data.desc);
          this.getTable(this.state.orderID,true);
      }
      else message.error("收货单创建失败！");
    },
      (error) => {
        message.error("收货单创建失败！");
      })

  console.log(values.subOrderID);
  };
  getTable=(id,reload)=> {
    getOrderStatus(id).then(
      (response) => {
        this.state.orderID=id;
        if(response.data.status==300)
        message.info(response.data.desc);
        else if(response.data.status==500)
        message.error(response.data.desc);
        else if(response.data.status==200){
          if(reload==false){
            message.success(response.data.desc);
          }
          this.state.dataSource=response.data.data;
          let temp = [...this.state.dataSource];    
          this.setState({
            dataSource : temp,
        });
      }
        else
        message.error("查询失败");
      },
      (error) => {
        message.error("查询失败");
      })
  };
  onFinish = (values) => {
   this.getTable(values.orderID,false);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    const columns = [
			{
				title: '子订单号',
				dataIndex: 'subOrderID',
        key:'subOrderID',
				align: 'center',
			},
			{
				title: '物料编号',
				dataIndex: 'materialID',
				align: 'center'
			},
			{
				title: '价格',
				dataIndex: 'price',
				align: 'center',
			},
			{
				title: '供应商编号',
				dataIndex: 'supplierID',
				align: 'center',
			},
      {
				title: '库存地点',
        dataIndex: 'storageLocation',
				align: 'center',
			},
      {
				title: '下单时间',
        dataIndex: 'date',
				align: 'center',
			},
			{
				title: '收货状态',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						<Popconfirm title="确定要收货吗？"  onConfirm={() => this.handleReceive(record)}>
							<Button type="primary" style={{display:(record.storageLocation!=null?'none':'block')}}>
							  确认收货
							</Button>
              <CheckCircleOutlined style={{ display:(record.storageLocation==null?'none':'block'), fontSize: '20px', color: '#52c41a' }}/>
              </Popconfirm>
              <Divider type="vertical" />
					</Space>
				)
			}
		];
    return (
      <div>  
      <Form layout="vertical" 
      hideRequiredMark 
      onFinish={this.onFinish} ref={this.formRef}
      onFinishFailed={this.onFinishFailed}>
        <Row gutter={24} style={{ marginLeft: 2 }}>订单编号</Row>
      <Row gutter={24} style={{ marginTop: 8 }}>
          <Col span={12}>
              <Form.Item name="orderID" rules={[{ required: true, message: '请输入订单编号' }]}>
                  <Input placeholder="必填项" />
              </Form.Item>
          </Col>
          <Col span={1.5}>
          <Button htmlType="reset" >
                  重置
              </Button>
          </Col>
          <Col span={1}>
          <Button type="primary" htmlType="submit" >
                  提交
              </Button>
              </Col>
              </Row>
              <Row gutter={24} >
            <Col span={15}>
              选择收货库存地点:
                            <Select defaultValue='TG00' style={{ width: 120,marginLeft:12}}
                            onChange={this.handleChange}>{this.state.location.map(Storage => (
                            <Option key={Storage}>{Storage}</Option>
                            ))}
                            </Select>
                            </Col>
                            </Row>
  </Form >
  <div>
    <Table
      className="table"
      columns={columns}
      dataSource={this.state.dataSource}
      rowKey={(record) => record.materialID}
      pagination={{ pageSize: 7 }}
      size="small"
      style={{ marginTop: 20}}
    />
    </div>
    </div>
    );
  }
}
