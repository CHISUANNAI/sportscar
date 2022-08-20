import { Divider, Steps , Input ,Tabs,Badge, Descriptions, message} from 'antd';
import React, { Component } from 'react';
import { AccountBookOutlined,CarryOutOutlined,AudioOutlined,BankOutlined} from '@ant-design/icons';
import axios from 'axios';
import { DocumentFlow } from '../../API/auth';
const { Step } = Steps;
const { TabPane } = Tabs;
const { Search } = Input;

export default class Documentflowmanagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:'',
      order:'',
      resp:[],
      isfirst:true,
      isLoading: false,
    };//初始化
  }

  //翻页
  onChange = (value) => {
    this.setState({
      current:value
    })
    console.log(this.state.current)
  };
  //查找,页面渲染
  onSearch = (value) => {
    this.setState({
      order:value,
      isfirst: true,
    })
    DocumentFlow(value).then(
      (response) => {
        if(response.status === 200 && response.data.status === 200  ){
            this.setState({
                resp: response.data.data,
                isfirst: false,
            })
            console.log(response)
        }
        else{
          console.log('没有获得数据');
          message.warning("此订单不存在")
        }
      },
      (error) => {
        console.log('失败了', this.state.order,error);
      },
    ); 
  }
 //数据
 
  render (){
        return(
          <div>
          <div style={{ height:5 }}></div>
          <Search placeholder="input search order ID" 
                  style={{width: 330,margin:"auto", display: 'flex', justifyContent: 'center'}} 
                  onSearch={this.onSearch} enterButton />
          <div style={{ height:20 }}></div>
          <Steps current={this.state.isfirst?0:3} onChange={this.onChange} width={500}>
            <Step title='物料' description="Material of the Order." icon={<BankOutlined />} />
            <Step title='订单' description="PO of the Order." icon= {<CarryOutOutlined />} />
            <Step title= '发票' description="Invoice of the Order." icon={<AccountBookOutlined />} />
          </Steps>
          <Divider />
          <div onChange={this.onChange} style={{ width:1200,margin:"auto",display:this.state.order!=null?'block':'none' }} >
                <div style={{display:this.state.current==0?'block':'none' }} >
                  <Descriptions title="Material" bordered column={2}>
                  <Descriptions.Item label="物料编号" >{!this.state.isfirst?this.state.resp[1][0].materialID:''}</Descriptions.Item>
                  <Descriptions.Item label="物料名称">{!this.state.isfirst?this.state.resp[1][0].materialName:''}</Descriptions.Item>
                  <Descriptions.Item label="毛重(kg)" >{!this.state.isfirst?this.state.resp[1][0].weight:''}</Descriptions.Item>
                  <Descriptions.Item label="工厂" >{!this.state.isfirst?this.state.resp[1][0].factory:''}</Descriptions.Item>
                  <Descriptions.Item label="简单描述" >{!this.state.isfirst?this.state.resp[1][0].description:''}</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{display:this.state.current==1?'block':'none' }}>
                  <Descriptions title="Procurement Order" bordered column={2}>
                  <Descriptions.Item label="子订单号" >{!this.state.isfirst?this.state.resp[0][0].subOrderID:''}</Descriptions.Item>
                  <Descriptions.Item label="订单号">{!this.state.isfirst?this.state.resp[0][0].orderID:''}</Descriptions.Item>
                  <Descriptions.Item label="价格" >{!this.state.isfirst?this.state.resp[0][0].price:''}</Descriptions.Item>
                  <Descriptions.Item label="数量" >{!this.state.isfirst?this.state.resp[0][0].amount:''}</Descriptions.Item>
                  <Descriptions.Item label="报价请求单号">{!this.state.isfirst?this.state.resp[0][0].rfqID:''}</Descriptions.Item>
                  <Descriptions.Item label="物料编号">{!this.state.isfirst?this.state.resp[0][0].materialID:''}</Descriptions.Item>
                  <Descriptions.Item label="供应商编号">{!this.state.isfirst?this.state.resp[0][0].supplierID:''}</Descriptions.Item>
                  <Descriptions.Item label="用户编号" >{!this.state.isfirst?this.state.resp[0][0].userID:''}</Descriptions.Item>
                  <Descriptions.Item label="日期" >{!this.state.isfirst?this.state.resp[0][0].date:''}</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{display:this.state.current==2?'block':'none'}}>
                  <Descriptions title="Invoice" bordered column={2}>
                  <Descriptions.Item label="子发票编号">{!this.state.isfirst?this.state.resp[2][0].sub_invoiceID:''}</Descriptions.Item>
                  <Descriptions.Item label="子订单号" >{!this.state.isfirst?this.state.resp[2][0].suborderid:''}</Descriptions.Item>
                  <Descriptions.Item label="价格">{!this.state.isfirst?this.state.resp[2][0].price:''}</Descriptions.Item>
                  <Descriptions.Item label="总量">{!this.state.isfirst?this.state.resp[2][0].amount:''}</Descriptions.Item>
                  <Descriptions.Item label="物料编号">{!this.state.isfirst?this.state.resp[2][0].materialid:''}</Descriptions.Item>
                  <Descriptions.Item label="发票编号">{!this.state.isfirst?this.state.resp[2][0].invoiceid:''}</Descriptions.Item>
                  <Descriptions.Item label="用户编号" >{!this.state.isfirst?this.state.resp[2][0].userid:''}</Descriptions.Item>
                  <Descriptions.Item label="供应商" >{!this.state.isfirst?this.state.resp[2][0].supplierid:''}</Descriptions.Item>
                  </Descriptions>
                </div>
                </div>
                </div>);
  };
};




