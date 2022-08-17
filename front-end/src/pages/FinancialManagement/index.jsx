import React, { Component } from "react";
import './index.css';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space,Checkbox, message,Alert } from 'antd';
import {Table, Tag } from 'antd';
import { showsubid } from "../../API/auth";
const { Search } = Input;
// const onSearch = (value) => console.log(value);

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const columns = [
  {
    title: '子订单ID',
    dataIndex: 'sub_orderID',
    key: 'sub_orderID',
  },
  {
    title: '供应商ID',
    dataIndex: 'supplierID',
    key: 'supplierID',
  },
  {
    title: '物料ID',
    dataIndex: 'materialID',
    key: 'materialID',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '金额',
    dataIndex: 'price',
    key: 'pirce',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Checkbox onChange={onChange}>选择</Checkbox>
    ),
  },

];
const data = [
  {
    key: '1',
    sub_orderID: 'John Brown',
    supplierID: 32,
    materialID: 'New York No. 1 Lake Park',
    amount:30,
    price:27.8
  },
  {
    key: '2',
    key: '1',
    sub_orderID: 'John Brown2',
    supplierID: 32,
    materialID: 'New York No. 1 Lake Park',
    amount:30,
    price:27.8
    
  }
];


export default class FinancialManagement extends Component {

  onSearch = (value) =>{
    showsubid(value).then(
     
      (response)=>{
        if(response.data.msg=="不存在该订单号"){
          message.error(response.data.msg)
        }
        else {
          console.log(response.data.data)
        }
        
      },
  
      (error)=>{
        console.log('数据获取失败', error);
      }
    );
  }; 
 
  render() {
    return (
      <div>
        <h1>发票管理</h1>
      <Space direction="vertical">
        <Search placeholder="输入订单号"  size="large" onSearch={this.onSearch} enterButton />

      </Space>

      {/* 间距 */}
      <h1>   </h1> 
  
      <Table columns={columns} dataSource={data} />
    
      </div>
      
      
    );
  }
}
