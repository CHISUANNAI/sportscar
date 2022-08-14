import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Supplierlist, Supplierdelete, Supplieredit } from '../../../API/auth';
//import { getToken } from '../../../utils/auth';
import EditSupplier from '../Edit';

//静态测试供应商列表
const dataSource = [
	{
		supplierID: '10001',
		supplierName: '公司1',
		region: '中国上海市嘉定区安亭镇创新港',
		language: '中文',
		clerkVendor: '10351'
	},
	{
		supplierID: '10002',
		supplierName: '公司2',
		region: '中国上海市嘉定区曹安公路',
		language: '英语',
		clerkVendor: '10352'
	}, {
		supplierID: '10003',
		supplierName: '公司3',
		region: '中国上海市杨浦区四平路',
		language: '法语',
		clerkVendor: '10353'
	}, {
		supplierID: '10004',
		supplierName: '公司4',
		region: '中国上海市杨浦区五角场',
		language: '中文',
		clerkVendor: '10354'
	}
];

export default class SupplierList extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		dataSource: []
	};

	componentDidMount() {
		Supplierlist().then(
			(response) => {
				//拿到我们想要渲染的数据(res)
				this.setState({
					dataSource: response.data.data
				});
				console.log(response.data.data)
			},
			(error) => {
				console.log('失败了', error);
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

	// 传给抽屉用于编辑的函数
	handleEditClick = (value) => {
		value.region = (value.region === '' || value.region === null) ? null : value.region;
		value.language = (value.language === '' || value.language === null) ? null : value.language;
		value.clerkVendor = (value.clerkVendor === '' || value.clerkVendor === null) ? null : value.clerkVendor;
		// 先传值
		Supplieredit(value).then(
			(response) => {
				if (response.data.state === 200) {
					message.success('修改成功');
					Supplierlist().then(
						(response) => {
							this.setState({
								dataSource: response.data.data
							});
						},
						(error) => {
							console.log('失败了', error);
						}
					);
				} else if(response.data.state === 6002) {
					message.info('员工编码不存在');
				} else {
					message.info('修改失败，请重试')
				}
			},
			(error) => {
				console.log('数据获取失败', error);
			}
		);
	};
	// 用于删除供应商的函数
	handleDelete = (supplierID) => {
		console.log(supplierID)
		Supplierdelete(supplierID).then(
			(response) => {
				if (response.data.state === 200) {
					message.success('删除成功');
					// 删除成功后改变页面内容
					const dataSource = [...this.state.dataSource];
					this.setState({
						dataSource: dataSource.filter((item) => item.supplierID !== supplierID)
					});
				} else message.info(response.data.message);
			},
			(error) => {
				console.log('数据获取失败', error);
			}
		);
	};

	render() {
		// const user = JSON.parse(getToken());
		const columns = [
			{
				title: '供应商标识码',
				dataIndex: 'supplierID',
				align: 'center',
				...this.getColumnSearchProps('supplierID')
			},
			{
				title: '供应商名称',
				dataIndex: 'supplierName',
				align: 'center',
				...this.getColumnSearchProps('supplierName')
			},
			{
				title: '供应商地址',
				dataIndex: 'region',
				align: 'center',
				...this.getColumnSearchProps('region')
			},
			{
				title: '沟通语言',
				dataIndex: 'language',
				align: 'center',
				...this.getColumnSearchProps('language')
			}
			,
			{
				title: '本公司对应员工编号',
				dataIndex: 'clerkVendor',
				align: 'center',
				...this.getColumnSearchProps('clerkVendor')
			},
			{
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						<EditSupplier supplier={record} handleEditClick={this.handleEditClick} />
						<Divider type="vertical" />
						<Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record.supplierID)}>
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
					dataSource={this.state.dataSource.map(dataSource => {
						dataSource.region = (dataSource.region === null) ? '未知' : dataSource.region;
						dataSource.language = (dataSource.language === null) ? '未知' : dataSource.language;
						dataSource.clerkVendor = (dataSource.clerkVendor === null) ? '未知' : dataSource.clerkVendor;
						return dataSource
					})}
					rowKey={(record) => record.supplierID}
					pagination={{ pageSize: 7 }}
					size="small"
				/>
			</div>
		);
	}
}
