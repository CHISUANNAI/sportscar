import React, { Component } from "react";
import './index.css';
import { Tree } from 'antd';

export default class documentflowmanagement extends Component {
  render() {
    const dig = (path = '0', level = 3) => {
      const list = [];
    
      for (let i = 0; i < 2; i += 1) {
        const key = `${path}-${i}`;
        const treeNode = {
          title: key,
          key,
        };
    
        if (level > 0) {
          treeNode.children = dig(key, level - 1);
        }
    
        list.push(treeNode);
      }
    
      return list;
    };
    
    const treeData = dig();
    return (
      
      <div>

        <Tree treeData={treeData} height={233} defaultExpandAll />
      </div>
    );
  }
}
