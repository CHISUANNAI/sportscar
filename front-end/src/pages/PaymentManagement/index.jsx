import React, { Component } from "react";
import './index.css';
import { Input, Space,Checkbox, message,Alert ,Button,Col, Row, Statistic,Divider,PageHeader} from 'antd';
import { CheckOutlined} from '@ant-design/icons';
import {Table, Tag } from 'antd';
import { count, showinvoice,addpayment } from "../../API/auth";
const { Search } = Input;
const onSearch = (value) => console.log(value);


export default class PaymentManagement extends Component {
  state = {   
    price:'',
    invoicelist:[],
    orderID:'',
    price2:'',
    flag:false
    
    
};

  

getcolumns(){
  let self = this;
  return  [
    {
      title: '子订单编号',
      dataIndex: 'suborderid',
      key: 'suborderid',
    },
    {
      title: '供应商编号',
      dataIndex: 'supplierid',
      key: 'supplierid',
    },
    {
      title: '物料编号',
      dataIndex: 'materialid',
      key: 'materialid',
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
      render:(text, record, index) => (
        <Button type="primary"  disabled={record.flag}
        onClick={() =>{this.onClick(record)}} 
         >Clear</Button> //this.state.invoicelist[index].price 取到这一行的price
      
      ),
    },
  ];
}
//点击表格的clear 可以balance 点击完让这一行的按钮呈现禁用状态
onClick(record){
  // console.log(this.state.invoicelist[index].price)
  this.setState(
    {
      price:parseFloat(this.state.price-record.price).toFixed(2),
      invoicelist: this.state.invoicelist.map(invoicelist => {
        invoicelist.flag = invoicelist.suborderid === record.suborderid ? true : invoicelist.flag;
        return invoicelist
      })

    }
  )
  

  
 
}

//输入大订单id，加载所有订单的金额之和（账单管理）
  onSearch = (value) =>{
    count(value).then(
      (response)=>{
        this.setState({
          price:'',
          flag:false
          
        }) //重置刷新
        if(response.data.msg=="不存在该订单号"){
          message.error("不存在该订单号！")
        }
      
        else {
          this.setState({
            price:response.data.data
        });
        }
        
      },
  
      (error)=>{
        console.log('数据获取失败', error);
      }
    );
    showinvoice(value).then(
      (response)=>{
        this.setState({
          invoicelist:[]
        }) //重置刷新
        if(response.data.msg=="不存在该订单号"){
           console.log(222)
        }
        else if(response.data.msg=="已生成账单"){
          message.info("已生成账单！")
          this.setState({
            price:0.00
          })
        }
      
        else {
          console.log(response.data.data)
          this.setState({
          invoicelist:response.data.data
        })
        }
        
      },
  
      (error)=>{
        console.log('数据获取失败', error);
      }
    
    )
    this.state.invoicelist = this.state.invoicelist.map(invoicelist => {
      invoicelist.flag = false;
      return invoicelist
    })
  }; 

  //取到搜索框的值赋给orderID
  onChange = (e) => {
    console.log('Change:', e.target.value);
    this.setState({
      orderID: e.target.value
    })
  };

  //生成账单
  Click=(value)=>{
    console.log(value.orderID)
   
    //先调用count 把真正的price传给state里的price
    count(value.orderID).then(
      
      (response)=>{
        this.setState({
            price2:response.data.data
        });
        console.log(this.state.price2)
        }
    )
     //balance为0再调用
    if(this.state.price==0){
    addpayment(value).then(
      (response)=>{
        message.success("已生成账单")
        this.setState(
          {
            flag:true
          }
        )

      }
    )
    }
    else{
      message.error("收支不平衡，无法生成账单")
    }



  }




  componentDidMount() {
    this.onSearch();

}
  render() {
    return (
      <div>
        
       <PageHeader 
       
    className="site-page-header"
    icon={<CheckOutlined />}
    title="账单管理"
    subTitle="清账 | 付款"
  >

  </PageHeader>
  <div style={{height:30}}> </div>

        <Row gutter={700}>
      <Col span={12}>
      <Space direction="vertical">
        <Search placeholder="输入订单号"  size="large" onSearch={this.onSearch}  onChange={this.onChange}     enterButton />

      </Space>
      </Col>
      <Col span={12}>
      <Statistic title="Account Balance (CNY)"  prefix="￥" value={this.state.price} precision={2} />
      </Col>
      </Row>

      {/* 间距 */}
      <div style={{height:30}}> </div>
  
      <Table style={{height:250}} columns={this.getcolumns()} dataSource={this.state.invoicelist} />

      <div style={{height:30}}> </div>
      <Button  type="primary" icon={<CheckOutlined />}  onClick={() =>{this.Click(this.state)}}  disabled={this.state.flag}>Post</Button>
      </div>

      
    );
  }
}