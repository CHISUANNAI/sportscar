import { Tabs } from 'antd';
import React, { Component } from 'react';
// 引入组件列表
import EmployeeList from './EmployeeList';
import CreateEmployee from './Create';
import { getToken, setToken } from '../../utils/auth';
const { TabPane } = Tabs;
 
export default class EmployeeManagement extends Component {
    // 这个类的一些属性
    newTabIndex = 0;
    state = {
        activeKey: '1',
        panes: [],
        isAdmin: JSON.parse(getToken()).status === 0 ? false : true
    };
    // handleCreateClick用于新建后返回列表页
    handleCreateClick = () => {
        this.setState({ activeKey: '1' });
    };
    // onChange用于改变tab
    onChange = (activeKey) => {
        this.setState({ activeKey });
    };
    // onEdit用于处理新增、删除页签
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    // remove用于删除页签
    remove = (targetKey) => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        } else {
            activeKey = '1';
        }
        this.setState({ panes, activeKey });
    };
 
    render() {
        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    <TabPane tab="员工列表" key="1" closable={false}>
                        {this.state.activeKey === '1' ? <EmployeeList /> : null}
                    </TabPane>
                    <TabPane tab="创建员工" key="2" closable={false} disabled = {this.state.isAdmin}>
                        {this.state.activeKey === '2' ? (
                            <CreateEmployee handleCreateClick={this.handleCreateClick} />
                        ) : null}
                    </TabPane>
                    {this.state.panes.map((pane) => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}