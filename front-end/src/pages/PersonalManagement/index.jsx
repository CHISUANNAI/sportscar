import React, { Component } from "react";
import { Upload, Avatar, Form, Button, Col, Row, Input, Select, message , Space, Card} from 'antd';
import './index.css';
import { UploadOutlined } from '@ant-design/icons';
import { useredit } from '../../API/auth';
import { getToken, setToken } from '../../utils/auth';
const { Option } = Select;
const base="http://localhost:3000/avatar/"


export default class PersonalManagement extends Component {
  constructor(props) {
    super(props);
    const { handleChangeClick } = this.props;
    this.handleChangeClick = handleChangeClick;
}
    formRef = React.createRef();
    
   
    onFinish = (value) => {

      let userID = JSON.parse(getToken()).userID;

        //转换数据内容
        value.gender = (value.gender === '0' || value.gender === '女') ? 0 : (value.gender === '1' || value.gender === '男') ? 1 : null;
        value.email = (value.email === '' || value.email === null) ? null : value.email;
        value.phone = (value.phone === '' || value.phone === null) ? null : value.phone;
        console.log(value)
        // 先传值
        useredit(value,userID).then(
            (response) => {
                console.log(response.data.data)
                if (response.data.state === 200) { //成功状态码200
                    message.success('修改成功');
                    //对token更新
                    if (userID){
                        let token = JSON.parse(getToken());
                        token.userName = value.userName
                        token.phone = value.phone
                        token.email = value.email
                        token.gender = value.gender
                        token.gender = value.avatar
                        setToken(JSON.stringify(token))
                    }
                } else if (response.data.state === 4001){
                    message.info('用户账号不存在')
                } else if (response.data.state === 5002){
                    message.info('修改产生未知异常')
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
    const normFile = (e) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    return (
    <Form layout="vertical" onFinish={this.onFinish} ref={this.formRef}>
      <Row name='personal' gutter={20} >
        <Col style={{width:600}} offset={2}>
          <div>
              <Row gutter={12}>
                {/* 姓名 */}
                <Col span={12}>
                  <Form.Item name="userName" label="姓名"
                  rules={[{ required: true, message: '请输入姓名' }]}
                  initialValue={user.userName} >
                      <Input />
                  </Form.Item>
                </Col>
                {/* 性别 */}
                <Col span={12}>
                  <Form.Item name="gender" label="性别"
                  initialValue={(user.gender === 0) ? '女' : (user.gender === 1) ? '男' : null}>
                    <Select>
                      <Option value="0">女</Option>
                      <Option value="1">男</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                {/* 手机号 */}
                <Col span={12}>
                  <Form.Item name="phone" label="手机号"
                  rules={[{ pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号' }]}
                  initialValue={user.phone} >
                      <Input />
                  </Form.Item>
                </Col>
                {/* 邮箱 */}
                <Col span={12}>
                  <Form.Item name="email" label="邮箱"
                  rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
                  initialValue={user.email} >
                      <Input />
                  </Form.Item>
                </Col>
              </Row>
              {/* 按钮 */}
              <Form.Item>
                <div>
                    <Space size={20}>
                      <Button htmlType="reset">
                          重置
                      </Button>
                      <Button type="primary" htmlType="submit">
                          提交
                      </Button>
                    </Space>
                </div>
              </Form.Item>
          </div>
        </Col>
        <Col offset={2}>
          
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
              }}
            >
              <div className="avatar">
                <Avatar size={64} 
                src={user.avatar !== null ? `${base}${user.avatar}`:'https://joeschmoe.io/api/v1/random'} 
                />
              </div>
              <div offset={0.5}>
                  <Form.Item
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      action={`${base}`}
                      listType="picture"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>上传头像</Button>
                    </Upload>
                  </Form.Item>
              </div>
            </Space>        
          
        </Col>
      </Row>
    </Form >  
    );
  }
}
