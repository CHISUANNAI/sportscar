import React, { Component } from 'react';
import { Table, Input, Button, Space, Divider, Popconfirm, message, Badge, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
//import { AddQuatationRequest, DeleteQuatationRequest, ShowAllQuatationRequest } from '../../../services/auth';
//import { getToken } from '../../../utils/auth';
import { selectAllPO,deletePOBySubOrderID} from '../../../API/auth';
//静态测试员工列表
const dataSource = [
    {
        userID: '11353',
        rfqID: 'abc',
        supplierID: 1,
        supplierName: '18018055555',
        materialID: 'test@group.com',
        amount: 1,
        price:111,
        date:1998-11-11,
        limitedDate:1998-11-12,
        state:1,
    },
    {
        userID: '11351',
        rfqID: 'abc',
        supplierID: 1,
        supplierName: '18018055555',
        materialID: 'test@group.com',
        amount: 1,
        price:111,
        date:1998-11-11,
        limitedDate:1998-11-12,
        state:0,
    },
    {
        userID: '11352',
        rfqID: 'abc',
        supplierID: 1,
        supplierName: '18018055555',
        materialID: 'test@group.com',
        amount: 1,
        price:111,
        date:1998-11-11,
        limitedDate:1998-11-12,
        state:1,
    }
];



export default class SubOrderList extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        dataSource: []
    };

    componentDidMount() {
        selectAllPO().then(
			(response) => {
				//拿到我们想要渲染的数据(res)
				this.setState({
					dataSource: response.data.data
				});
				console.log(response.data.data)
			},
			(error) => {
				console.log("出错了",error);
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
        console.log(value)
    // 	// 先传值
    // 	AddQuatationRequest(value).then(
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
     };
     //用于删除PO的函数
     SubPODelete = (subOrderID) => {
        deletePOBySubOrderID(subOrderID).then(
           (response) => {
               if (response.data.status === 200) {
                   message.success('删除成功');
                   // 删除成功后改变页面内容
                   const dataSource = [ ...this.state.dataSource ];
                   this.setState({
                       dataSource: dataSource.filter((item) => item.subOrderID !== subOrderID)
                   });
               } else message.info(response.data.desc);
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
				title: '订单编号',
				dataIndex: 'orderID',
				align: 'center',
				...this.getColumnSearchProps('orderID')
			},
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
				title: '创建日期',
				dataIndex: 'date',
				align: 'center',
				...this.getColumnSearchProps('date')
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

        return (
            <div>
                <Table
                    className="table"
                    columns={columns}
                    // dataSource={dataSource}
                    dataSource={this.state.dataSource?.map(dataSource => {
                        dataSource.date = dataSource.date.slice(0,10)+" "+dataSource.date.slice(11,19);
                        dataSource.date=new Date(dataSource.date + 'Z').toLocaleString()
                        return dataSource
                    })}
                    rowKey={(record,index) => index }
                    pagination={{ pageSize: 7 }}
                    size="small"
                />
            </div>
        );
    }
}
