
import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React, { Component } from 'react';
import { LineChartOutlined } from '@ant-design/icons';
import {getHistoryStock,getMaterialStock} from '../../../API/StockManagement';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//import echarts from 'echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';

const { Option } = Select;
export default class MaterialInventory extends Component {
    constructor(props) {
        super(props);
        const { handleEditClick } = this.props;
        this.handleEditClick = handleEditClick;
        this.state = { visible: false,location:['MI00'],materialID:123,selectlocation:'MI00'};
    }

    showDrawer = ()=> {
        this.loadchart(this.props.material.materialID,this.state.selectlocation);//加载图表
        this.loadStorageDivisionChart(this.props.material.materialID);
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
         //window.location.reload();
      
    };

    onFinish = (value) => {
        this.handleEditClick(value);
        this.onClose();
    };
    loadchart(materialID,location){//加载图表函数
        getHistoryStock(materialID,location).then(
            (response) => {
                 var echarts = require("echarts");
                // // 基于准备好的dom，初始化echarts实例

                 let mychart= echarts.getInstanceByDom(document.getElementById(materialID));
                 if(mychart==null){
                     mychart = echarts.init(document.getElementById(materialID));
                 }
                // }
                // var echarts = require("echarts");
                // let mychart= echarts.init(document.getElementById('chart'));
                // 绘制图表
                this.option={
                    legend:{
                        show:true, //默认true，控制是否展示图例
                        left:80,
                        top:70,
                        orient:'vertical'
                    },
                    backgroundColor: '#fff',
                    title: { text: '物料库存历史记录',x:'center',y:20},
                    tooltip: {},
                    xAxis: {
                      data: [],
                      axisLabel:{
                        rotate:30,
                      }
                    },
                    yAxis: [ {
                        name: '库存量',
                        splitLine: { show: true },
                        axisLabel: {
                          formatter: "{value} "
                        }
                      },
                      {
                        name: '入库量',
                        splitLine: { show: true },
                        axisLabel: {
                          formatter: "{value} "
                        }
                      }],
                    series: [{
                        name: '库存量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '入库量',
                        type: 'line',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }
                this.option.xAxis.data=response.data.timeline;
                this.option.series[0].data=response.data.data;
                this.option.series[1].data=response.data.monthin;
                this.option.title.text=this.option.title.text+"("+this.state.selectlocation+")";
                mychart.setOption(this.option,true);
            },
            (error) => {
              console.log("失败了", error);
            }
          );
     };
     loadStorage(id){//加载可选库存地点
        getMaterialStock(id).then(
            (response) => {
                if(response.data.location) {
                    this.state.location=response.data.location;
                    this.state.selectlocation=this.state.location[0];
                }
            },
            (error) => {
              console.log("失败了", error);
            }
          );
     };
    loadStorageDivisionChart(materialID){
        getMaterialStock(materialID).then(
            (response) => {
                 var echarts = require("echarts");
                // // 基于准备好的dom，初始化echarts实例
                 let mychart= echarts.getInstanceByDom(document.getElementById(materialID+"sub"));
                 if(mychart==null){
                     mychart = echarts.init(document.getElementById(materialID+"sub"));
                 }
            
                this.option=  {
                    title: { text: '物料库存分布',x:'center',y:20},
                    tooltip: {
                      trigger: 'item'
                    },
                    legend: {
                      top: '85%',
                      left: 'center'
                    },
                    series: [
                      {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '65%'],
                        avoidLabelOverlap: false,
                        label: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                          }
                        },
                        label:{
                            normal:{
                                position:'inner',
                                show:true,
                                formatter:'{c}'
                            }
                        },
                        labelLine: {
                          show: false
                        },
                        data: [
                          { value: 1048, name: 'Search Engine' },
                          { value: 735, name: 'Direct' },
                          { value: 580, name: 'Email' },
                          { value: 484, name: 'Union Ads' },
                          { value: 300, name: 'Video Ads' }
                        ]
                      }
                    ]
                  };
                this.option.series[0].data=response.data.barchart;
                mychart.setOption(this.option,true);
            },
            (error) => {
              console.log("失败了", error);
            }
          );

     };
     handleChange = (value) => {
        this.state.selectlocation=value;
        this.loadchart(this.props.material.materialID,value);
      
      };
     componentDidMount() {
        this.loadStorage(this.props.material.materialID);//加载库存地点
        
      };

    render() {
        const { material } = this.props;
        return (
            <div>
                <Button type="link" onClick={this.showDrawer} size="small" icon={<LineChartOutlined />}>
                    库存
                </Button>
                <Drawer
                    title="物料库存详情"
                    width={850}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 0 }}
                >
                    <Form layout="vertical" hideRequiredMark onFinish={this.onFinish}>
                        <Row gutter={24}>
                            <Col span={12}>
                                物料编号：{material.materialID}
                            </Col>
                            <Col span={12}>
                                物料名称：{material.materialName}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                简单描述：{material.description}
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                毛重：{material.weight}
                            </Col>
                            <Col span={12}>
                                工厂：{material.factory}
                            </Col>
                        </Row>
                        <Row gutter={24} />
                        <Row gutter={24}>
                            <Col span={24}>选择库存地点:
                            <Select defaultValue={this.state.location[0]} style={{ width: 120,marginLeft:12}}
                            onChange={this.handleChange}>{this.state.location.map(Storage => (
                            <Option key={Storage}>{Storage}</Option>
                            ))}
                            </Select>
                            </Col>
                            </Row>
                        <Row gutter={24}>    
                        <div id={material.materialID} style={{ width: 500, height: 400 }}></div>
                        <div id={material.materialID+"sub"} style={{ width: 300, height: 400 }}></div>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}
