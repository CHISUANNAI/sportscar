import React, { Component } from "react";
import './index.css';
import { pwEditApi } from '../../API/auth'
import { getToken } from "../../utils/auth";
import { Form, Input, Button, Layout, Space, message, Col, Row } from 'antd';
import {LockOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

import axios from "axios";
const { Footer,Content } = Layout;
const base="http://localhost:8080"
export default class PasswordEdit extends Component {
  constructor(props) {
		super(props);
		this.state = {
      user: {
          name: JSON.parse(getToken()).userName
      },
    };
  };
  
  onFinish = (value) => {
    //console.log(value.confirm)
    let newPwInfo = {
      userName: this.state.user.name,
      old: value.old,
      password: value.confirm
    };
    pwEditApi(newPwInfo).then(
      
        (response) => {
        //response内容要注意！
        console.log(response.data.data); //控制台输出response内容
        if (response.data.state === 200) {
          message.success('密码修改成功');
          this.props.history.push({   //链接跳转
            pathname: '/Home',
          });
        } else if (response.data.state === 4001){
          message.info('用户信息异常');
        } else if (response.data.state === 4002){
          message.info('初始密码错误');
        } else {
          message.info(response.data.message);
        }
      },
      (error) => {
        console.log('数据获取失败', error);
      }
  );
  }

  render() {
    const user = JSON.parse(getToken());
    return ( 
		  <Layout className="bg">
				<Content>
          <div className="pw">
            <Form labelCol={{span: 8}} onFinish={this.onFinish} ref={this.formRef}>
                {/* 当前密码 */}
                <Form.Item
                name="old"
                label="当前密码"
                rules={[
                  {
                  required: true,
                  message: '请输入当前密码！'
                  }
                ]}
                >
                  <Input.Password
                    prefix={<LockOutlined/>}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    
                  />
                </Form.Item>

                {/* 新密码 */}
                <Form.Item
                name="newpassword"
                label="请输入新密码"
                rules={[
                  {
                  required: true,
                  message: '请输入新密码！'
                  }
                ]}
                >
                  <Input.Password
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                {/* 确认新密码 */}
                <Form.Item
                  name="confirm"
                  label="请再次输入新密码"
                  dependencies={['newpassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请确认新密码！',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        //空or两次密码相同
                        if (!value || getFieldValue('newpassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('您所输入的两次密码不同，请重新输入！'));
                      },
                    }),
                  ]}
                >
                <Input.Password />
                 </Form.Item>

                <Form.Item>
                <Row gutter={15}>
                  <Col className="gutter-row" span={6} offset={10}>
                      <Button type="primary" htmlType="submit">
                      提交
                      </Button>
                  </Col>
                  <Col className="gutter-row" span={6}>
                      <Button htmlType="reset">
                      清空
                      </Button>
                  </Col>
                </Row>
                </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}
