import React, { Component } from "react";
import './index.css';
import { Card, Avatar, Col, Row } from "antd";
import {FieldNumberOutlined,MailOutlined,PhoneOutlined,ManOutlined,WomanOutlined,UserOutlined,IdcardOutlined} from '@ant-design/icons';
import axios from "axios";
import { getToken } from "../../utils/auth";
import { Column } from "@antv/g2plot";
const base="http://localhost:3000/avatar/"
export default class Home extends Component {
  render() {
    const user = JSON.parse(getToken());
    console.log(user)
    return ( 
      <Row gutter={16}>
        <Col>
          <Avatar
            size={90} 
            src={user.avatar !== null ? `${base}${user.avatar}`:'https://joeschmoe.io/api/v1/random'}
          />
        </Col>
        <Col>
        <h1>欢迎您，{user.userName}</h1>
        <h2><FieldNumberOutlined />  {user.userID}</h2>
        <h2><MailOutlined />  {user.email !== null ? user.email:'邮箱'}</h2>
        <h2><PhoneOutlined /> {user.phone !== null ? user.phone:'电话'}</h2>
        
        {user.gender === 1 ? (<h2><ManOutlined /> 男</h2>) : (user.gender === 0 ? (<h2><WomanOutlined /> 女</h2>) : (<h2><UserOutlined /> 性别</h2>))}
        {user.status==0&&<h2><IdcardOutlined />身份：管理员</h2>}
        </Col>
      </Row>
    );
  }
}