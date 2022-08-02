import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
//import { Materiallist, Materialdelete, Materialedit } from '../../../services/auth';
//import { getToken } from '../../../utils/auth';
import MaterialInventory from '../Inventory';

//静态测试供应商列表
const dataSource = [
	{
		sub_orderID: '10001',
		orderID: '10111',
		rfqID:'22222',
		supplierID:'333333',
		userID:'44444',
		amount:'10001',
		materialID:'66666',
		price:'777777',
		
	},
	{
		sub_orderID: '10002',
		orderID: '1000111',
		rfqID:'3333333',
		supplierID:'444444',
		userID:'555555',
		amount:'66666',
		materialID:'77777',
		price:'88888',
	},
	{
		sub_orderID: '10003',
		orderID: '22222',
		rfqID:'333333',
		supplierID:'44444',
		userID:'55555',
		amount:'66666',
		materialID:'77777',
		price:'333333',
	},
	{
		sub_orderID: '10004',
		orderID: '222222',
		rfqID:'33333',
		supplierID:'44444',
		userID:'5555',
		amount:'66666',
		materialID:'333333',
		price:'999999',
	}
];

export default class OrderManagement extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		dataSource: []
	};

	// componentDidMount() {
	// 	Materiallist().then(
	// 		(response) => {
	// 			//拿到我们想要渲染的数据(res)
	// 			this.setState({
	// 				dataSource: response.data
	// 			});
	// 		},
	// 		(error) => {
	// 			console.log('失败了', error);
	// 		}
	// 	);
	// }
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

	// 传给抽屉用于编辑的函数
	// handleEditClick = (value) => {
	// 	// 先传值
	// 	Materialedit(value).then(
	// 		(response) => {
	// 			if (response.data === 'success') {
	// 				message.success('修改成功');
	// 				Materiallist().then(
	// 					(response) => {
	// 						this.setState({
	// 							dataSource: response.data
	// 						});
	// 					},
	// 					(error) => {
	// 						console.log('失败了', error);
	// 					}
	// 				);
	// 			} else {
	// 				message.info('修改失败，请重试');
	// 			}
	// 		},
	// 		(error) => {
	// 			console.log('数据获取失败', error);
	// 		}
	// 	);
	// };
	// 用于删除供应商的函数
	// handleDelete = (id) => {
	// 	Materialdelete(id).then(
	// 		(response) => {
	// 			if (response.data === 'success') {
	// 				message.success('删除成功');
	// 				// 删除成功后改变页面内容
	// 				const dataSource = [ ...this.state.dataSource ];
	// 				this.setState({
	// 					dataSource: dataSource.filter((item) => item.id !== id)
	// 				});
	// 			} else message.info('删除失败，请重试');
	// 		},
	// 		(error) => {
	// 			console.log('数据获取失败', error);
	// 		}
	// 	);
	// };

	render() {
		// const user = JSON.parse(getToken());
		const columns = [
			{
				title: '小订单编号编号',
				dataIndex: 'sub_orderID',
				align: 'center',
				...this.getColumnSearchProps('sub_orderID')
			},
			{
				title: '大订单编号',
				dataIndex: 'orderID',
				align: 'center',
				...this.getColumnSearchProps('orderID')
			},
			{
				title: '报价请求单号',
				dataIndex: 'rfqID',
				align: 'center',
				...this.getColumnSearchProps('rfqID')
			},
			{
				title: '供应商编号',
				dataIndex: 'supplierID',
				align: 'center',
				...this.getColumnSearchProps('supplierID')
			}
			,
			{
				title: '用户编号',
				dataIndex: 'userID',
				align: 'center',
				...this.getColumnSearchProps('userID')
			},
			{
				title: '物料总量',
				dataIndex: 'amount',
				align: 'center',
				...this.getColumnSearchProps('amount')
			},
			{
				title: '物料编号',
				dataIndex: 'materialID',
				align: 'center',
				...this.getColumnSearchProps('materialID')
			},
			{
				title: '小订单金额（数量*单价）',
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
						<MaterialInventory material={record} handleEditClick={this.handleEditClick} />
						<Divider type="vertical" />
						<Divider type="vertical" />
						<Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record.id)}>
							<Button danger type="text" size="small" icon={<DeleteOutlined />}>
								删除
							</Button>
						</Popconfirm>
					</Space>
				)
			}
		];
		return (
			<div>
				<Table
					className="table"
					columns={columns}
					// dataSource={this.state.dataSource}
					dataSource={dataSource}
					rowKey={(record) => record.id}
					pagination={{ pageSize: 7 }}
					size="small"
				/>
			</div>
		);
	}
}
