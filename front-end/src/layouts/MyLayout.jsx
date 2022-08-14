import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Button, Dropdown, Avatar, Calendar, Popover } from 'antd';
import { DatabaseOutlined, HomeOutlined, UserOutlined, DollarOutlined, CarryOutOutlined, ShoppingOutlined, EditOutlined, LogoutOutlined, CalendarOutlined, LockOutlined } from '@ant-design/icons';
import moment from "moment";
import 'antd/dist/antd.css';
import './MyLayout.css';
import { Route, Switch } from "react-router-dom";
import EmployeeManagement from "../pages/EmployeeManagement";
import FinancialManagement from "../pages/FinancialManagement";
import MaterialManagement from "../pages/MaterialManagement";
import OrderManagement from "../pages/OrderManagement";
import QuotationsManagement from "../pages/QuotationsManagement";
import ReceiveGoods from "../pages/ReceiveGoods";
import RequisitionManagement from "../pages/RequisitionManagement";
import SupplierManagement from "../pages/SupplierManagement";
import PersonalManagement from "../pages/PersonalManagement";
import PasswordEdit from "../pages/PasswordEdit";
import documentflowmanagement from "../pages/documentflowmanagement";
import Home from "../pages/Home";
import logo from "../graphs/logo.png";
import { getToken } from '../utils/auth';

const { Header, Footer, Content } = Layout;

const base="http://localhost:3000/avatar/"

const user = {
    name: JSON.parse(getToken()).userName,
    avatar: JSON.parse(getToken()).avatar
};

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

class MyLayout extends Component {
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        const path = e.key.toString();
        this.props.history.push({
            pathname: path,
        });
        console.log(e);
    };

    render() {
        const menu = (
            <Menu onClick={this.handleClick}>
                <Menu.Item key="/Home/personalManagement" icon={<EditOutlined />}>
                    个人设置
                </Menu.Item>
                <Menu.Item key="/Home/passwordEdit" icon={<LockOutlined />}>
                    修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    key="/"
                    danger
                    onClick={() => {
                        this.props.history.push("/");
                    }}
                    icon={<LogoutOutlined />}
                >
                    退出登录
                </Menu.Item>
            </Menu>
        );
        const content = (
            <div
                style={{
                    width: "300px",
                    border: "1px solid #f56a00",
                    borderradius: "2px",
                }}
            >
                <Calendar fullscreen={false} />
            </div>
        );
        return (
            <Layout>
                <Header
                    className="ant-menu"
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        width: '100%',
                    }}
                >
                    <img src={logo} alt="error" className="logo" />
                    <Menu
                        style={{
                            float: 'left'
                        }}
                        mode="horizontal"
                        onClick={this.handleClick}
                        defaultSelectedKeys={['/Home']}
                        items={[
                            getItem('首页', '/Home', <HomeOutlined />),
                            getItem('用户管理', 'sub2', <UserOutlined />, [
                                getItem('员工管理', '/Home/employeeManagement'),
                                getItem('供应商管理', '/Home/supplierManagement'),
                            ]),
                            getItem('物料管理', '/Home/materialManagement', <DatabaseOutlined />),
                            getItem('订单管理', 'sub4', <ShoppingOutlined />, [
                                getItem('报价请求管理', '/Home/requisitionManagement'),
                                getItem('比价单管理', '/Home/quotationsManagement'),
                                getItem('采购订单管理', '/Home/orderManagement'),
                                getItem('单据流管理', '/Home/documentflowmanagement'),
                            ]),
                            getItem('收货管理', '/Home/receiveGoods', <CarryOutOutlined />),
                            getItem('财务管理', '/Home/financialManagement', <DollarOutlined />),
                        ]}
                    />
                    <span style={{
                        float: 'right'
                    }}>
                        <Popover placement="bottom" content={content} trigger="click">
                            <Button danger shape="round" size="small" style={{ marginRight:"50px" }}
                            >
                                <CalendarOutlined />
                                Today&nbsp; : &nbsp;{moment().format("YYYY-MM-DD")}
                            </Button>
                        </Popover>
                        <Dropdown overlay={menu} placement="bottom">
                            <Button
                                type="text"
                                size="large"
                                icon={
                                    <Avatar
                                        style={{ backgroundColor: '#f56a00' }}
                                        src={`${base}${user.avatar}`}
                                        size="large"
                                    />
                                }
                            >
                                &nbsp;&nbsp;{user.name}
                            </Button>
                        </Dropdown>
                    </span>
                </Header>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 50px',
                        marginTop: 64,
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '10px 0',
                        }}
                    >
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 525,
                        }}
                    >
                        <Switch>
                            <Route
                                path="/Home/employeeManagement"
                                component={EmployeeManagement}
                            />
                            <Route
                                path="/Home/supplierManagement"
                                component={SupplierManagement}
                            />
                            <Route
                                path="/Home/materialManagement"
                                component={MaterialManagement}
                            />
                            <Route
                                path="/Home/requisitionManagement"
                                component={RequisitionManagement}
                            />
                            <Route
                                path="/Home/quotationsManagement"
                                component={QuotationsManagement}
                            />
                            <Route path="/Home/orderManagement"
                                component={OrderManagement}
                            />
                            <Route path="/Home/receiveGoods"
                                component={ReceiveGoods}
                            />
                            <Route
                                path="/Home/financialManagement"
                                component={FinancialManagement}
                            />
                            <Route
                                path="/Home/personalManagement"
                                component={PersonalManagement}
                            />
                            <Route
                                path="/Home/passwordEdit"
                                component={PasswordEdit}
                            />
                            <Route path="/Home" component={Home} />
                        </Switch>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    2019 级系统分析与设计课程设计 Copyright © 2022 MIS Group 3
                </Footer>
            </Layout>
        );
    }
}

export default MyLayout;