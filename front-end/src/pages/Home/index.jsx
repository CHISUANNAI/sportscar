import React, { Component } from "react";
import './index.css';
import { Card, Avatar, Col, Row } from "antd";
import {FieldNumberOutlined,MailOutlined,PhoneOutlined} from '@ant-design/icons';
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
            src={`${base}${user.avatar}`}
          />
        </Col>
        <Col>
        <h1>欢迎您，{user.userName}</h1>
        <h2><FieldNumberOutlined />  {user.userID}</h2>
        <h2><MailOutlined />  {user.email}</h2>
        <h2><PhoneOutlined /> {user.phone}</h2>
        
        //性别和管理员身份图标条件展示
       
        </Col>
      </Row>
    );
  }
}