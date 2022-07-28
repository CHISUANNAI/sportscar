import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
//import { Employeelist, Employeedelete, Employeeedit } from '../../../services/auth';
//import { getToken } from '../../../utils/auth';
import EditEmployee from '../Edit';

//静态测试员工列表
const dataSource = [
    {userID: '11351',
    userName: 'abc',
    telephone:'18018055555',
    mail:'test@group.com',
    status:'正常'
    },
    {userID: '11352',
    userName: 'dfe',
    telephone:'18018055555',
    mail:'test111@group.com',
    status:'封禁'
    },
    {userID: '11353',
    userName: 'fgh',
    telephone:'18018055555',
    mail:'test222@group.com',
    status:'封禁'
    }
];

export default class EmployeeList extends Component {
	state = {
		searchText: '',
		searchedColumn: '',
		dataSource: []
	};
	// 用于判断状态的函数，帮助生成badge
	judgeStatus = (status) => {
		switch (status) {
			case '正常':
				return 'success';
			case '封禁':
				return 'error';
			default:
				return 'default';
		}
	};

	// componentDidMount() {
	// 	Employeelist().then(
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
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
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
					searchWords={[ this.state.searchText ]}
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
	// 	Employeeedit(value).then(
	// 		(response) => {
	// 			if (response.data === 'success') {
	// 				message.success('修改成功');
	// 				Employeelist().then(
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
	// 用于删除员工的函数
	// handleDelete = (userID) => {
	// 	Employeedelete(userID).then(
	// 		(response) => {
	// 			if (response.data === 'success') {
	// 				message.success('删除成功');
	// 				// 删除成功后改变页面内容
	// 				const dataSource = [ ...this.state.dataSource ];
	// 				this.setState({
	// 					dataSource: dataSource.filter((item) => item.userID !== userID)
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
				title: '账号',
				dataIndex: 'userID',
				align: 'center',
				...this.getColumnSearchProps('userID')
			},
			{
				title: '姓名',
				dataIndex: 'userName',
				align: 'center',
				...this.getColumnSearchProps('userName')
			},
			{
				title: '电话',
				dataIndex: 'telephone',
				align: 'center',
				...this.getColumnSearchProps('telephone')
			},
			{
				title: '邮箱',
				dataIndex: 'mail',
				align: 'center',
				...this.getColumnSearchProps('mail')
			}
            ,
			{
				title: '状态',
				dataIndex: 'status',
				align: 'center',
				filters: [ { text: '正常', value: '正常' }, { text: '封禁', value: '封禁' } ],
				render: (status) => {
					return <Badge status={this.judgeStatus(status)} text={status} />;
				},
				onFilter: (value, record) => record.status.indexOf(value) === 0
			},
			{
				title: '',
				key: 'action',
				align: 'center',
				render: (record) => (
					<Space>
						<EditEmployee employee={record} handleEditClick={this.handleEditClick} />
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
