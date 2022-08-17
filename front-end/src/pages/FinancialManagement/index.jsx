import React, { Component }from "react";
import { useState } from 'react';
import './index.css';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space,Checkbox, message,Alert ,Button} from 'antd';
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
    title: '子订单编号',
    dataIndex: 'subOrderID',
    key: 'subOrderID',
  },
  {
    title: '供应商编号',
    dataIndex: 'supplierID',
    key: 'supplierID',
  },
  {
    title: '物料编号',
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



export default class FinancialManagement extends Component {
 
  
  state = {   
    data:[]
};

/** 输入订单id，查询出没有开过发票详情单的子订单情况 */
  onSearch = (value) =>{
    showsubid(value).then(
   
      (response)=>{
        this.setState({
          data:[]
        }) //重置刷新
        if(response.data.msg=="不存在该订单号"){
          message.error("不存在该订单号！")
        }
        else if(response.data.msg!="不存在该订单号" && response.data.data.length==0)
        {
          message.info("该订单已开过发票！")
        }
        else {
          this.setState({
            data:response.data.data
        })
        }
        
      },
  
      (error)=>{
        console.log('数据获取失败', error);
      }
    );
  }; 

  componentDidMount() {
    this.onSearch();

}
 
  render() {
    return (
      <div>
        <h1>发票管理</h1>
      <Space direction="vertical">
        <Search placeholder="输入订单号"  size="large" onSearch={this.onSearch} enterButton />

      </Space>

      {/* 间距 */}
      <div style={{height:30}}> </div>
  
      <Table style={{height:250}} columns={columns} dataSource={this.state.data} />

      <div style={{height:30}}> </div>

      <Button type="primary">开发票</Button>
    
      </div>
      
      
    );
  }
}
