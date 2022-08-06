import React, { Component } from "react";
import './index.css';
import { Card, Avatar, Col, Row } from "antd";
import {FieldNumberOutlined} from '@ant-design/icons';
import axios from "axios";
import { getToken } from "../../utils/auth";
import { Column } from "@antv/g2plot";
const base="http://localhost:8080"
export default class Home extends Component {
  render() {
    const user = JSON.parse(getToken());
    
    return ( 
      <Row gutter={16}>
        <Col>
          <Avatar
            size={90} 
            src={`${base}${user.avatar}`}
          />
        </Col>
        <Col>
        <h1>欢迎您，椰子味糯米团</h1>
        <h2><FieldNumberOutlined />  userID</h2>
        {/* {isLoggedIn ? (
 6         <LogoutButton onClick={this.handleLogoutClick} />
 7       ) : (
 8         <LoginButton onClick={this.handleLoginClick} />
 9       )}
 */}
        </Col>
      </Row>
    );
  }
}