import React, { Component }from "react";
import { useState } from 'react';
import './index.css';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space,Checkbox, message,Alert ,Button,Col, Row,Statistic,PageHeader,Form, Select,Modal,Radio  } from 'antd';
import {Table, Tag } from 'antd';
import { addinvoice, showsubid } from "../../API/auth";
import { CheckOutlined,TransactionOutlined,SnippetsOutlined} from '@ant-design/icons';
import { resolveOnChange } from "antd/lib/input/Input";
const { Search } = Input;
// const onSearch = (value) => console.log(value);


const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};





export default class FinancialManagement extends Component {
  getcolumns(){
    let self = this;
    return [
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
      render: (text, record, index) => (
        <Checkbox onChange={this.onChange.bind(this,record)}>选择</Checkbox>
      ),
    },
  
  ];
}
  




  formRef = React.createRef();
  
  onReset = () => {
    this.formRef.current.resetFields();
  };
  
state = {   
    data:[],
    state:false,
    subOrderID:''
};

onChange=(item,e) => {
  console.log('Change:', e.target.checked);
  console.log(item.subOrderID);
  this.setState({
    subOrderID:item.subOrderID
  })
};


 showModal = () => {
   this.setState({
    state:true
   })
};

 handleOk = () => {
  this.setState({
    state:false
   })
};

 handleCancel = () => {
  this.setState({
    state:false
   })
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

/** 开发票 */
onFinish = (values) => {
  console.log(values);
  addinvoice(values).then(
    (response)=>{
      message.success("已生成发票！")
    }
  )
};
// submit(value){
//   console.log(value)
//   console.log(value.subOrderID)
//   // addinvoice(value).then(
//   //   (response)=>{
//   //     console.log(response.data.data)
//   //   },
//   //   (error)=>{
//   //     console.log('数据获取失败', error);
//   //   }
//   // )
//  }
 
  render() {
    return (
      <div>
        <PageHeader 
       
       className="site-page-header"
     
       title="发票管理"
       subTitle="查询 | 开发票"
     />
     <div style={{height:30}}> </div>
      <Space direction="vertical">
        <Search placeholder="输入订单号"  size="large" onSearch={this.onSearch} enterButton />

      </Space>
      

      {/* 间距 */}
      <div style={{height:55}}> </div>
  
      <Table style={{height:250}} columns={this.getcolumns()} dataSource={this.state.data} />

      <div style={{height:30}}> </div>

      <Button type="primary" icon={<SnippetsOutlined />} onClick={this.showModal}>开发票</Button>
      <Modal title="填写发票信息" visible={this.state.state} onOk={this.handleOk} onCancel={this.handleCancel}>
      
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} disabled={this.state.formflag}
      initialValues={{
        subOrderID: this.state.subOrderID
      }}>
      <Form.Item
          name="subOrderID"
          label="子订单编号" 
         
        >
          <Input defaultValue={this.state.subOrderID}   key={this.state.subOrderID} disabled/>
        </Form.Item>
        <Form.Item
          name="storage_location"
          label="库存地点"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="公司名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
           <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="文本描述"
          rules={[
            {
              required: true,
            },
          ]}
        >
           <Input />
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          
        </Form.Item>
      </Form>
      </Modal>
    

    
      </div>

      
      
    );
  }
}
