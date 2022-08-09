import React, { Component } from "react";
import { Route, Switch } from "react-router-dom"; //导入react-router-dom组件
import Login from "./pages/Login"; //导入初始登录页面
import Register from "./pages/Register"; //导入注册页面
import MyLayout from "./layouts/MyLayout"; //导入主页面
import './App.css';
import whatever from "./pages/PasswordEdit";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Home" component={MyLayout} /> 
        <Route path="/Register" component={Register} />
        <Route path="/PasswordEdit" component={whatever} />
        <Route path="/" component={Login} />
        
       
      </Switch>
    );
  }
}