import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge, Collapse } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
//import { Materiallist, Materialdelete, Materialedit } from '../../../services/auth';
//import { getToken } from '../../../utils/auth';
import { selectAllPO, deletePOByOrderID, deletePOBySubOrderID } from '../../../API/auth';

//静态测试供应商列表
const dataSource = [
	{
		sub_orderID: '10001',
		rfqID: '22222',
		supplierID: '333333',
		amount: '10001',
		materialID: '66666',
		price: '777777',
		date: 1998 - 11 - 11,
	},
	{
		sub_orderID: '10002',
		rfqID: '3333333',
		supplierID: '444444',
		amount: '66666',
		materialID: '77777',
		price: '88888',
		date: 1998 - 11 - 11,
	},
	{
		sub_orderID: '10003',
		rfqID: '333333',
		supplierID: '44444',
		amount: '66666',
		materialID: '77777',
		price: '333333',
		date: 1998 - 11 - 11,
	},
	{
		sub_orderID: '10004',
		rfqID: '33333',
		supplierID: '44444',
		amount: '66666',
		materialID: '333333',
		price: '999999',
		date: 1998 - 11 - 11,
	}
];
const { Panel } = Collapse;
export default class OrderManagement extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		dataSource: [],
		sub_orderList: [],
		orderList: [],
		POsum: [],
	};
	componentDidMount() {
		selectAllPO().then(
			(response) => {
				//拿到我们想要渲染的数据(res)
				this.setState({
					dataSource: response.data.data
				});
				//订单号
				var list1 = [];
				var list = [];
				var posum = [];
				response.data.data?.map((item, index) => {
					item.date = item.date.slice(0, 10) + " " + item.date.slice(11, 19)
					item.date=new Date(item.date + 'Z').toLocaleString()
					if (!list1.some((i) => i == item.orderID)) {
						list1.push(item.orderID)
					}
				});
				list1.map((item, index) => {
					var l = []
					var s = 0
					response.data.data.map((item1, index1) => {
						if (item === item1.orderID) {
							l.push(item1)
							s = s + item1.amount * item1.price
						}
					})
					if (l.length > 0) {
						list.push(l)
						posum.push(s)
					}
					l = []
					s = 0
				})
				this.setState({
					sub_orderList: list,
					orderList: list1,
					POsum: posum,
				});
				//列表信息

				console.log(response.data.data)
			},
			(error) => {
				console.log("出错了", error);
			}
		);
	}
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
	PODelete = (OrderID) => {
		deletePOByOrderID(OrderID).then(
			(response) => {
				if (response.data.status === 200) {
					message.success('删除成功');
					// 删除成功后改变页面内容
					var sub_orderList = [...this.state.sub_orderList]
					var target = 0
					var orderList = [...this.state.orderList]
					var POsum = [...this.state.POsum]
					orderList.map((item, index) => {
						if (item === OrderID) {
							target = index
						}
					})
					this.setState({
						orderList: orderList.filter((item, index) => index !== target),
						sub_orderList: sub_orderList.filter((item, index) => index !== target),
						POsum: POsum.filter((item, index) => index !== target)
					});
				} else message.info(response.data.desc);
			},
			(error) => {
				console.log('数据获取失败', error);
			}
		);
	};
	SubPODelete = (subOrderID) => {
		deletePOBySubOrderID(subOrderID).then(
			(response) => {
				if (response.data.status === 200) {
					message.success('删除成功');
					// 删除成功后改变页面内容
					var sub_orderList1 = [...this.state.sub_orderList]
					var target = 0
					var subtarget = 0
					var orderList1 = [...this.state.orderList]
					var POsum1 = [...this.state.POsum]
					sub_orderList1.map((item, index) => {
						item.map((item1, index1) => {
							if (item1.subOrderID === subOrderID) {
								target = index
								subtarget = index1
							}
						})

					})
					POsum1[target] = POsum1[target] - sub_orderList1[target][subtarget].price*sub_orderList1[target][subtarget].amount
					sub_orderList1[target]=sub_orderList1[target].slice() 
					sub_orderList1[target].splice(subtarget, 1)
					if (sub_orderList1[target].length !== 0) {
						this.setState({
							POsum: POsum1,
							sub_orderList: sub_orderList1,
						},()=>{console.log(this.state.sub_orderList)});
					} else {
						this.setState({
							orderList: orderList1.filter((item, index) => index !== target),
							sub_orderList: sub_orderList1.filter((item, index) => index !== target),
							POsum: POsum1.filter((item, index) => index !== target)
						});
					}
				} else message.info(response.data.desc);
			},
			(error) => {
				console.log('数据获取失败', error);
			}
		);
	};
	onChange = (key) => {
		console.log(key);
	};


	render() {
		// const user = JSON.parse(getToken());
		const columns = [
			{
				title: '子订单编号',
				dataIndex: 'subOrderID',
				align: 'center',
				...this.getColumnSearchProps('subOrderID')
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
			},
			{
				title: '物料编号',
				dataIndex: 'materialID',
				align: 'center',
				...this.getColumnSearchProps('materialID')
			},
			{
				title: '单价',
				dataIndex: 'price',
				align: 'center',
				...this.getColumnSearchProps('price')
			},
			{
				title: '物料数量',
				dataIndex: 'amount',
				align: 'center',
				...this.getColumnSearchProps('amount')
			},
			{
				title: '子订单金额',
				key: 'action1',
				align: 'center',
				render: (record) => (
					<Space>
						{(record.price * record.amount).toFixed(2) + "元"}
					</Space>
				)
			},
			{
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						{/* <PODetail PODetail={record} handleEditClick={this.handleEditClick} /> */}
						<Divider type="vertical" />
						<Divider type="vertical" />
						<Popconfirm title="确定要删除吗？" onConfirm={() => this.SubPODelete(record.subOrderID)}>
							<Button danger type="text" size="small" icon={<DeleteOutlined />}>
								删除
							</Button>
						</Popconfirm>
					</Space>
				)
			}
		];
		// const Collapses=
		return (
			<div>
				{this.state.orderList?.map((item, index) => {
					return (
						<Collapse defaultActiveKey={['1']} key={index}>
							<Panel header={"订单编号：" + item + "   " + "日期：" + this.state.sub_orderList[index][0].date}>
								<div>
									<Table
										className="table"
										columns={columns}
										// dataSource={this.state.dataSource}
										dataSource={this.state?.sub_orderList[index]}
										rowKey={(record) => record.subOrderID}
										pagination={{ pageSize: 7 }}
										size="small"
									/>
								</div>
								<div style={{ marginLeft: 16 }}>订单总价：<span>{this.state.POsum[index].toFixed(2) + "元"}</span>
									<Space>
										{/* <PODetail PODetail={record} handleEditClick={this.handleEditClick} /> */}
										<Divider type="vertical" />
										<Divider type="vertical" />
										<Popconfirm title="确定要删除吗？" onConfirm={() => this.PODelete(item)}>
											<Button danger type="text" size="small" icon={<DeleteOutlined />}>
												删除
											</Button>
										</Popconfirm>
									</Space>
								</div>

							</Panel>
						</Collapse>
					)
				})}
			</div>
		)
		// 	<Collapse defaultActiveKey={['1']} onChange={this.onChange}>
		// 		<Panel header="订单编号：" key="1">
		// 			<div>
		// 				<Table
		// 					className="table"
		// 					columns={columns}
		// 					// dataSource={this.state.dataSource}
		// 					dataSource={dataSource}
		// 					rowKey={(record) => record.id}
		// 					pagination={{ pageSize: 7 }}
		// 					size="small"
		// 				/>
		// 			</div>
		// 			<div style={{ marginLeft: 16 }}>订单总价:<span>100元</span></div>
		// 		</Panel>
		// 	</Collapse>
		// );

		// 	return (
		// <div>
		// 	<Table
		// 		className="table"
		// 		columns={columns}
		// 		// dataSource={this.state.dataSource}
		// 		dataSource={dataSource}
		// 		rowKey={(record) => record.id}
		// 		pagination={{ pageSize: 7 }}
		// 		size="small"
		// 	/>
		// </div>
		// 	);
		// }
	}
}
