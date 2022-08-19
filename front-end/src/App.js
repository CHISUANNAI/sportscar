import React, { Component } from "react";
import { Route, Switch } from "react-router-dom"; //导入react-router-dom组件
import Login from "./pages/Login"; //导入初始登录页面
import Register from "./pages/Register"; //导入注册页面
import MyLayout from "./layouts/MyLayout"; //导入主页面
import Home from "./pages/Home";
import './App.css';
import PasswordEdit from "./pages/PasswordEdit";


export default class App extends Component {
  render() {
    return (
      <Switch>
        
          {/* 路由算法会根据定义的顺序自顶向下匹配路由。
          因此，当你拥有两个兄弟路由节点配置时，你必须确认前一个路由不会匹配后一个路由中的路径 */}
          <Route path="/Home" component={MyLayout} /> 
          <Route path="/Register" component={Register} />
          <Route path="/PasswordEdit" component={PasswordEdit} />
          <Route path="/" component={Login}/>
      </Switch>
    );
  }
}