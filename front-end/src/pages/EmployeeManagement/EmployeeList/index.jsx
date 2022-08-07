import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Employeelist } from '../../../API/auth';
//import { getToken } from '../../../utils/auth';
import EditEmployee from '../Edit';

//静态测试员工列表
// const dataSource = [
//     {
//         userID: '00000',
//         userName: 'abc',
//         gender: 1,
//         phone: '18018055555',
//         email: 'test@group.com',
//         status: 1
//     },
//     {
//         userID: '11352',
//         userName: 'dfe',
//         gender: 0,
//         phone: '18018055555',
//         email: 'test111@group.com',
//         status: 0
//     },
//     {
//         userID: '11353',
//         userName: 'fgh',
//         gender: 1,
//         phone: '18018055555',
//         email: 'test222@group.com',
//         status: 0
//     }
// ];

export default class EmployeeList extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        dataSource: []
    };

    componentDidMount() {
        Employeelist().then(
            (response) => {
                //拿到我们想要渲染的数据(res)
                this.setState({
                    dataSource: response.data.data
                });
                console.log(response.data.data);
            },
            (error) => {
                console.log('失败了', error);
            }
        );
    }

    // 搜索框函数
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
        //转换数据内容
        value.gender = (value.gender === '1' || value.gender === '女')  ? 1 : (value.gender === '0' || value.gender === '男') ? 0 : null;
        value.status = (value.status === '1' || value.status === '管理员') ? 1 : 0;
        console.log(value)
        
        // 先传值
        // 	Employeeedit(value).then(
        // 		(response) => {
        // 			if (response.data.state === 200) { //成功状态码200
        // 				message.success('修改成功');
        // 				Employeelist().then(
        // 					(response) => {
        // 						this.setState({
        // 							dataSource: response.data.data
        // 						});
        // 					},
        // 					(error) => {
        // 						console.log('失败了', error);
        // 					}
        // 				);
        // 			} else {
        // 				message.info(response.data.message);
        // 			}
        // 		},
        // 		(error) => {
        // 			console.log('数据获取失败', error);
        // 		}
        // 	);
    };
    // 用于删除员工的函数
    handleDelete = (userID) => {
        console.log(userID)
        // 	Employeedelete(userID).then(
        // 		(response) => {
        // 			if (response.data.state === 200) {
        // 				message.success('删除成功');
        // 				// 删除成功后改变页面内容
        // 				const dataSource = [ ...this.state.dataSource ];
        // 				this.setState({
        // 					dataSource: dataSource.filter((item) => item.userID !== userID)
        // 				});
        // 			} else message.info(response.data.message);
        // 		},
        // 		(error) => {
        // 			console.log('数据获取失败', error);
        // 		}
        // 	);
    };


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
                title: '性别',
                dataIndex: 'gender',
                align: 'center',
                filters: [{ text: '女', value: '女' }, { text: '男', value: '男' }],
                onFilter: (value, record) => record.gender.startsWith(value),
                render: gender =>
                    gender === '女' ? (
                        <Tag color='volcano' key='女'>
                            女
                        </Tag>
                    ) : gender === '男' ? (
                        <Tag color='geekblue' key='男'>
                            男
                        </Tag>
                    ) : (
                        <Tag color='default' key='null'>
                            未知
                        </Tag>),
            },
            {
                title: '电话',
                dataIndex: 'phone',
                align: 'center',
                ...this.getColumnSearchProps('phone')
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'center',
                ...this.getColumnSearchProps('email')
            }
            ,
            {
                title: '身份',
                dataIndex: 'status',
                align: 'center',
                filters: [{ text: '管理员', value: '管理员' }, { text: '员工', value: '员工' }],
                render: status =>
                    status === '管理员' ? (
                        <Badge status='success' text='管理员' />
                    ) : (
                        <Badge status='error' text='员工' />
                    ),
                onFilter: (value, record) => record.status.startsWith(value)
            },
            {
                title: '',
                key: 'action',
                align: 'center',
                render: (record) => (
                    <Space>
                        <EditEmployee employee={record} handleEditClick={this.handleEditClick} />
                        <Divider type="vertical" />
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDelete(record.userID)}>
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
                        dataSource.gender = (dataSource.gender === 1 || dataSource.gender === '女') ? '女' : ((dataSource.gender === 0 || dataSource.gender === '男') ? '男' : null);
                        dataSource.status = (dataSource.status === 1 || dataSource.status === '管理员') ? '管理员' : '员工';
                        dataSource.phone = (dataSource.phone === null) ? '未知' : dataSource.phone;
                        dataSource.email = (dataSource.email === null) ? '未知' : dataSource.email;
                        return dataSource
                    })}
                    //静态测试数据
                    // dataSource={dataSource.map(dataSource => {
                    //     dataSource.gender = (dataSource.gender === 1 || dataSource.gender === '女') ? '女' : '男';
                    //     dataSource.status = (dataSource.status === 1 || dataSource.status === '管理员') ? '管理员' : '员工';
                    //     return dataSource
                    // })}
                    rowKey={(record) => record.userID}
                    pagination={{ pageSize: 7 }}
                    size="small"
                />
            </div>
        );
    }
}
