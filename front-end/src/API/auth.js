import axios from "axios";
import qs from 'qs'
const baseURL = "http://localhost:8080";

//用户登录信息验证
export function loginApi(loginInfo) {
  return axios.get(`${baseURL}/users/login`, {
    params: {
      userName: loginInfo.name,
      password: loginInfo.password
    },
    withCredentials : true
  });
}

//用户注册
export function registerApi(value) {
  return axios.get(`${baseURL}/users/reg`, {
    params: {
      userName: value.name,
      password: value.password,
      gender: value.gender,
      phone: value.phone,
      email: value.email
    },
    withCredentials : true
  });
}

//用户密码修改
export function pwEditApi(newPwInfo) {
  return axios.get(`${baseURL}/users/changePw`, {
    params: {
      userName: newPwInfo.userName,
      old: newPwInfo.old,
      password: newPwInfo.password
    },
    withCredentials : true
  });
}

//修改个人信息
export function useredit(value,id) {
  return axios.get(`${baseURL}/users/changeIn`, {
    params: {
      userID: id,
      userName: value.userName,
      gender: value.gender,
      phone: value.phone,
      email: value.email,
      avatar: value.avatar
    },
    withCredentials : true
  });
}


/**
 * 获取列表
 */
export function Employeelist() {
  return axios.get(`${baseURL}/users/load`,
  {withCredentials : true});
}
export function Supplierlist() {
  return axios.get(`${baseURL}/suppliers/load`,
  {withCredentials : true});
}
export function Materiallist() {
  return axios.get(`${baseURL}/materials/load`,
  {withCredentials : true});
}


/**
 * 删除信息
 */
export function Employeedelete(userID) {
  return axios.get(`${baseURL}/users/delete`, {
    params: {
      userID: userID
    },
    withCredentials : true
  });
}
export function Supplierdelete(supplierID) {
  return axios.get(`${baseURL}/suppliers/delete`, {
    params: {
      supplierID: supplierID
    },
    withCredentials : true
  });
}
export function Materialdelete(materialID) {
  return axios.get(`${baseURL}/materials/delete`, {
    params: {
      materialID: materialID
    },
    withCredentials : true
  });
}

/**
* 修改信息
*/
export function Employeeedit(value) {
  return axios.get(`${baseURL}/users/update`, {
    params: {
      userID: value.userID,
      userName: value.userName,
      gender: value.gender,
      phone: value.phone,
      email: value.email,
      status: value.status
    },
    withCredentials : true
  });
}
export function Supplieredit(value) {
  return axios.get(`${baseURL}/suppliers/update`, {
    params: {
      supplierID: value.supplierID,
      supplierName: value.supplierName,
      region: value.region,
      language: value.language,
      clerkVendor: value.clerkVendor
    },
    withCredentials : true
  });
}
export function Materialedit(value) {
  return axios.get(`${baseURL}/materials/update`, {
    params: {
      materialID: value.materialID,
      materialName: value.materialName,
      description: value.description,
      weight: value.weight,
      factory: value.factory
    },
    withCredentials : true
  });
}

/**
 * 新增信息
 */
export function Employeeadd(value) {
  return axios.get(`${baseURL}/users/create`, {
    params: {
      userName: value.userName,
      gender: value.gender,
      phone: value.phone,
      email: value.email
    },
    withCredentials : true
  });
}
export function Supplieradd(value) {
  return axios.get(`${baseURL}/suppliers/create`, {
    params: {
      supplierName: value.supplierName,
      region: value.region,
      language: value.language,
      clerkVendor: value.clerkVendor
    },
    withCredentials : true
  });
}
export function Materialadd(value) {
  return axios.get(`${baseURL}/materials/create`, {
    params: {
      materialName: value.materialName,
      description: value.description,
      weight: value.weight,
      factory: value.factory
    },
    withCredentials : true
  });
}

/**发票接口
 * +
 * 账单接口 */
//输入大订单id，加载没有开过发票的小订单id(发票管理)
export function showsubid(value){
  return axios.get(`${baseURL}/invoice/id`,{
    params:{
      orderID:value
    },
    withCredentials : true
  });
}

//输入大订单id，加载所有订单的金额之和（账单管理）
export function count(value){
  return axios.get(`${baseURL}/payment/count`,{
    params:{
      orderID:value
    },
    withCredentials : true
  })
}
//输入大订单id，加载开过的所有发票详情（账单管理）
export function showinvoice(value){
  return axios.get(`${baseURL}/payment/showinvoice`,{
    params:{
      orderID:value
    },
    withCredentials : true
  })
}
//生成账单（账单管理）
export function addpayment(value){
  return axios.get(`${baseURL}/payment/addpayment`,{
    params:{
      orderID:value.orderID,
      price:value.price2
    },
    withCredentials : true
  })
}



/*** 
 * 报价订单接口
*/
//查询报价订单
export function ShowAllQuatationRequest() {
  return axios({
    url:`${baseURL}/ShowAllQuatationRequest`,
    params:{
    },
    method:'get',
    withCredentials : true
})
}
//删除报价订单
export function DeleteQuatationRequest(rfqID) {
  return axios({
    url:`${baseURL}/DeleteQuatationRequest`,
    params:{
      rfqID:rfqID
    },
    method:'get',
    withCredentials : true
})
}
//添加报价订单
export function AddQuatationRequest(value) {
  return axios({
    url:`${baseURL}/AddQuatationRequest`,
    params:{
      supplierID:value.supplierID,
      materialID:value.materialID,
      amount:value.amount,
      date_limit:value.date_limit
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    },
    method:'get',
    withCredentials : true
})
}
/**
 * 采购订单相关接口
*/
//查询所有订单
export function selectAllPO() {
  return axios({
    url:`${baseURL}/ProcurementOrder/selectAllPO`,
    params:{
    },
    method:'get',
    withCredentials : true
})
}
//根据订单号删除订单
export function deletePOByOrderID(OrderID) {
  return axios({
    url:`${baseURL}/ProcurementOrder/deleteProcurementOrderSeriesByOrderID`,
    params:{
      OrderID:OrderID,
    },
    method:'get',
    withCredentials : true
})
}
//根据子订单号删除订单
export function deletePOBySubOrderID(sub_orderID) {
  return axios({
    url:`${baseURL}/ProcurementOrder/deleteProcurementOrderSeriesBySub_orderID`,
    params:{
      sub_orderID:sub_orderID,
    },
    method:'get',
    withCredentials : true
})
}
//单据流
export function DocumentFlow() {
  return axios.get(`${baseURL}/ProcurementOrder/SelectPO`,
  {withCredentials : true});
}

//比价实现
export function GetRfq() {
  return axios.get(`${baseURL}/SelectQuatationRequestByState`,
  {withCredentials : true});
}

export function CreatPO(value1,value2,value3) {
  return axios.get(`${baseURL}/ProcurementOrder/CreateProcurementOrder`, {
    params: {
      rfqID:value1,
      supplierID:value2,
      materialID:value3,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    },
    method:'get',
    withCredentials : true
  });
}
