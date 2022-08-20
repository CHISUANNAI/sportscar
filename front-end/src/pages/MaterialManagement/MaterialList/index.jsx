import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Materiallist, Materialdelete, Materialedit } from '../../../API/auth';
//import { getToken } from '../../../utils/auth';
import EditMaterial from '../Edit';
import MaterialInventory from '../Inventory';

export default class MaterialList extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		dataSource: []
	};

	componentDidMount() {
		Materiallist().then(
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
		// 先传值
		value.description = (value.description === '' || value.description === null) ? null : value.description;
        value.weight = (value.weight === '' || value.weight === null) ? null : value.weight;
		value.factory = (value.factory === '' || value.factory === null) ? null : value.factory;
		console.log(value)
		Materialedit(value).then(
			(response) => {
				if (response.data.state === 200) { //成功状态码200
					message.success('修改成功');
					//重新获取物料列表
					Materiallist().then(
						(response) => {
							this.setState({
								dataSource: response.data.data
							});
						},
						(error) => {
							console.log('失败了', error);
						}
					);
				} else {
					message.info(response.data.message);
				}
			},
			(error) => {
				console.log('数据获取失败', error);
			}
		);
	};
	// 用于删除供应商的函数
	handleDelete = (materialID) => {
		console.log(materialID)
		Materialdelete(materialID).then(
			(response) => {
				if (response.data.state === 200) {
					message.success('删除成功');
					// 删除成功后改变页面内容
					const dataSource = [...this.state.dataSource];
					this.setState({
						dataSource: dataSource.filter((item) => item.materialID !== materialID)
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
				title: '物料编号',
				dataIndex: 'materialID',
				align: 'center',
				...this.getColumnSearchProps('materialID')
			},
			{
				title: '物料名称',
				dataIndex: 'materialName',
				align: 'center',
				...this.getColumnSearchProps('materialName')
			},
			{
				title: '简单描述',
				dataIndex: 'description',
				align: 'center',
				...this.getColumnSearchProps('description')
			},
			{
				title: '毛重',
				dataIndex: 'weight',
				align: 'center',
				...this.getColumnSearchProps('weight')
			}
			,
			{
				title: '工厂',
				dataIndex: 'factory',
				align: 'center',
				...this.getColumnSearchProps('factory')
			},
			{
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						<MaterialInventory material={record} handleEditClick={this.handleEditClick} />
						<Divider type="vertical" />
						<EditMaterial material={record} handleEditClick={this.handleEditClick} />
						<Divider type="vertical" />
						<Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record.materialID)}>
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
					dataSource={this.state.dataSource}
					rowKey={(record) => record.materialID}
					pagination={{ pageSize: 7 }}
					size="small"
				/>
			</div>
		);
	}
}
