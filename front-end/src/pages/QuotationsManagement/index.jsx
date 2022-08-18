import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, CheckOutlined,CheckCircleTwoTone  } from '@ant-design/icons';
import { Materialdelete,GetRfq,CreatPO} from '../../API/auth';
//import { getToken } from '../../../utils/auth';


//静态测试供应商列表
export default class QuoationsManagement extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     }
    //   }

	state = {
        searchText: '',
        searchedColumn: '',
        dataSource: [],
        rfqID:[],
        supplierID:[],
        materialID:[],
        prepo:[]
	};
    //拿到报价单
	componentDidMount() {
		GetRfq().then(
			(response) => {
				//拿到我们想要渲染的数据(res)
				this.setState({
				dataSource: response.data.data
				});
				console.log(response.data.data)
                this.state.prepo=[]
			},
			(error) => {
				console.log('失败了', error);
			}
		);
	}
    //生成订单
    creatPO(){
        CreatPO(this.state.rfqID,this.state.supplierID,this.state.materialID).then(
            (response) => {
				//拿到我们想要渲染的数据(res)
                if (response.status === 200) { 
					message.success('生成订单成功');
                    window.location.reload() 
                    
                }
			},
			(error) => {
				console.log('失败了', error);
                console.log(this.state.rfqID,this.state.supplierID,this.state.materialID)
			}
        );
    }
    
	搜索框函数
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

    onConfirm = (record) => {
        this.setState({
            rfqID:[...this.state.rfqID,record.rfqID],
            materialID:[...this.state.materialID,record.materialID],
            supplierID:[...this.state.supplierID,record.supplierID],
            prepo:[...this.state.prepo,record],
        });
        console.log(this.state.rfqID)
    }; 
    
	render() {
		// const user = JSON.parse(getToken());
		const columns = [
			{
				title: '报价请求编号',
				dataIndex: 'rfqID',
				align: 'center',
				...this.getColumnSearchProps('rfqID')
			},
			{
				title: '供应商编号',
				dataIndex: 'supplierID',
				align: 'center',
				...this.getColumnSearchProps('supplierID')
			},
			{
				title: '供应商姓名',
				dataIndex: 'supplierName',
				align: 'center',
				...this.getColumnSearchProps('supplierName')
			},
			{
				title: '物料编号',
				dataIndex: 'materialID',
				align: 'center',
				...this.getColumnSearchProps('materialID')
			}
			,
			{
				title: '数量',
				dataIndex: 'amount',
				align: 'center',
				...this.getColumnSearchProps('amount')
			},
            {
				title: '价格',
				dataIndex: 'price',
				align: 'center',
				...this.getColumnSearchProps('price')
			},
			{
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						<Popconfirm title="确定选择吗？" onConfirm={()=>this.onConfirm(record)} >
							<Button type="text" size="small" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}  >
								选择
							</Button>
						</Popconfirm>
					</Space>
				)
			}
		];
        
		return (
			<div>
                <div style={{ margin:20}}>未处理的报价单</div>
				<Table
					className="table"
					columns={columns}
					dataSource={this.state.dataSource.map(dataSource => {
                        dataSource.description = (dataSource.description === null) ? '未知' : dataSource.description;
                        dataSource.weight = (dataSource.weight === null) ? '未知' : dataSource.weight;
                        dataSource.factory = (dataSource.factory === null) ? '未知' : dataSource.factory;
                        return dataSource
                    })}
                    rowKey={(record) => record.materialID}
					pagination={{ pageSize: 7 }}
					size="small"
                    
				/>
                <button  type="primary" style={{display:'block',margin:"auto"}} onClick={()=>this.creatPO()}>生成订单</button>
			
                <div style={{ margin:20}}>已选择订单</div>
                <Table
                    columns={columns}
                    dataSource={this.state.prepo}
                    size="small"
                />
            
            </div>
		);
	}
}
