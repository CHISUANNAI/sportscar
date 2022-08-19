import { Tabs } from 'antd';
import React, { Component } from 'react';
// 引入组件列表
import Instorage from './InStorage';
import ReceiveDocuments from './ReceiveDocuments';
 
const { TabPane } = Tabs;
 
export default class ReceiveGoods extends Component {
    // 这个类的一些属性
    newTabIndex = 0;
    state = {
        activeKey: '1',
        panes: []
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
                    <TabPane tab="收货入库" key="1" closable={false}>
                        {this.state.activeKey === '1' ? <Instorage /> : null}
                    </TabPane>
                    <TabPane tab="单据查询" key="2" closable={false}>
                        {this.state.activeKey === '2' ? (
                            <ReceiveDocuments handleCreateClick={this.handleCreateClick} />
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