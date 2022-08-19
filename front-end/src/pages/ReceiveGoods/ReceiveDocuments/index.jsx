import React, { useState,Component } from "react";
import {Row,Col,Table,Input, Button, Space, Divider, Popconfirm, message,Select,Modal } from 'antd';
import { Route, Switch } from "react-router-dom";
import {checkReceive,checkAllReceive,receiveProduct} from '../../../API/ReceiveGoods';
import { MinusCircleOutlined,CheckCircleOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;
export default class ReceiveGoods extends Component {
  constructor(props) {
    super(props);
    
  };
  
  state = {
    dataSource:[],
    dataSourceSub:[],
    isModalVisible:false,
	};
  getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						搜索
					</Button>
					<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						重置
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			)
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	};
  getTable=()=> {
    checkAllReceive().then(
      (response) => {
        console.log(response.data.status);
        if(response.data.status==300)
        message.info(response.data.desc);
        else if(response.data.status==200){
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
  showModal = (id) => {
    checkReceive(id).then(
      (response) => {
        if(response.data.status==300)
        message.info(response.data.desc);
        else if(response.data.status==200){
          this.state.dataSourceSub=response.data.detail;
          let temp = [...this.state.dataSourceSub];    
          this.setState({
            dataSourceSub : temp,
        });
      }
        else
        message.error("查询失败");
      },
      (error) => {
        message.error("查询失败");
      })

    this.setState({
      isModalVisible: true
  });
  };
  componentDidMount(){
   this.getTable();
  };
  render() {

    const handleOk = () => {
      this.setState({
        isModalVisible: false
    });
    };
  
    const handleCancel = () => {
      this.setState({
        isModalVisible: false
    });
    };
    const columnsSub = [
			{
				title: '子收货单号',
				dataIndex: 'subReceiveid',
        key:'subReceiveid',
				align: 'center',
        
			},
			{
				title: '子订单号',
        dataIndex: 'subOrderid',
        key:'subOrderid',
				align: 'center',
			},
      {
				title: '物料编号',
				dataIndex: 'materialid',
				align: 'center',
			},
			{
				title: '数量',
				dataIndex: 'amount',
				align: 'center',
			},
			{
				title: '供应商编号',
				dataIndex: 'supplierid',
				align: 'center',
			},
      {
				title: '库存地点',
        dataIndex: 'storageLocation',
				align: 'center',
			},
      {
				title: '收货时间',
        dataIndex: 'date',
				align: 'center',
			},
      {
				title: '收货状态',
        dataIndex: 'status',
				align: 'center',
			}];
    const columns = [
			{
				title: '收货单号',
				dataIndex: 'receiveid',
        key:'receiveid',
				align: 'center',
        ...this.getColumnSearchProps('receiveid')
			},
			{
				title: '订单号',
				dataIndex: 'orderid',
				align: 'center',
        ...this.getColumnSearchProps('orderid')
			},
			{
				title: '收货状态',
				dataIndex: 'status',
				align: 'center',
      },
      {
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
              <CheckCircleOutlined style={{ display:(record.status!='已完成'?'none':'block'), fontSize: '20px', color: '#52c41a' }}/>
					</Space>
				)
			},
			{
				title: '操作',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
							<Button type="link" key={record.orderid} onClick={() => this.showModal(record.orderid)} >
							  查看明细
							</Button>
					</Space>
				)
			}
		];
    return (
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
  
      <Modal title="收货单详情" visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel} width='800px'>
      <Table
      className="table"
      columns={columnsSub}
      dataSource={this.state.dataSourceSub}
      rowKey={(record) => record.materialID}
      pagination={{ pageSize: 4 }}
      size="small"
      
    />
      </Modal>
    </div>
    );
  }
}
