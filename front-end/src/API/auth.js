import axios from "axios";
/**
 * 用户登录判断
 * @param loginInfo
 */
const baseURL = "http://friday.nat100.top";
export function loginApi(loginInfo) {
    //后端数据地址
  return axios.get(`${baseURL}/agentLogin`, {
    params: {
      id: loginInfo.id,
      password: loginInfo.password,
    },
  });
}

/**
 * 详情
 * @param id
 */
export function Inquirydetail(id) {
  return axios.get(`${baseURL}/inquiryDetail`, {
    params: { id: id },
  });
}
export function Orderdetail(id) {
  return axios.get(`${baseURL}/orderAgentDetail`, {
    params: { id: id },
  });
}
export function Quotationdetail(id) {
  return axios.get(`${baseURL}/quotationDetail`, {
    params: { id: id },
  });
}

/**
 * 获取列表
 */
export function Inquirylist(id) {
  return axios.get(`${baseURL}/inquiryAgentList`, { params: { id: id } });
}
export function Orderlist(id) {
  return axios.get(`${baseURL}/orderAgentList`, { params: { id: id } });
}
export function Quotationlist(id) {
  return axios.get(`${baseURL}/quotationAgentList`, { params: { id: id } });
}
// 用于拿到询价单的商品信息
export function Inquiryproductlist(id) {
  return axios.get(`${baseURL}/inquiryProductList`, {
    params: { id: id },
  });
}
export function Inquirymatch(id, authority) {
  return axios.get(`${baseURL}/inquiryMatch`, {
    params: { id: id, authority: authority },
  });
}
export function Quotationmatch(id, authority) {
  return axios.get(`${baseURL}/quotationMatch`, {
    params: { id: id, authority: authority },
  });
}
export function Goodsplantlist(id) {
  return axios.get(`${baseURL}/goodsPlantList`, {
    params: { id: id },
  });
}
export function Productonsalelist() {
  return axios.get(`${baseURL}/productOnsaleList`);
}
/**
 * 删除
 * @param {*} id
 * @returns
 */
export function Inquirydelete(id) {
  return axios.get(`${baseURL}/inquiryDelete`, {
    params: { id: id },
  });
}
export function Orderdelete(id) {
  return axios.get(`${baseURL}/orderDelete`, {
    params: { id: id },
  });
}
export function Quotationdelete(id) {
  return axios.get(`${baseURL}/quotationDelete`, {
    params: { id: id },
  });
}
export function Deliverydelete(id) {
  return axios.get(`${baseURL}/deliveryDelete`, {
    params: { id: id },
  });
}
/**
 * 新建
 * @returns result xxx_id
 */
export function Orderadd(order) {
  return axios.post(`${baseURL}/orderAdd`, order);
}
export function Deliveryadd(delivery) {
  return axios.post(`${baseURL}/deliveryAdd`, delivery);
}
export function Agentadd(agent) {
  return axios.post(`${baseURL}/agentAdd`, agent);
}
export function Companyadd(company) {
  return axios.post(`${baseURL}/companyAdd`, company);
}
export function Quotationadd(quotation) {
  return axios.post(`${baseURL}/quotationAdd`, quotation);
}
export function Deliveryrecordadd(e) {
  return axios.post(`${baseURL}/deliveryRecordAdd`, e);
}
export function Inquiryadd(inq) {
  return axios.post(`${baseURL}/inquiryAdd`, inq);
}
/**
 * 修改信息
 */
export function Productedit(product) {
  return axios.post(`${baseURL}/productEdit`, product);
}
export function Orderedit(order) {
  return axios.post(`${baseURL}/orderEdit`, order);
}
export function Quotationedit(quotation) {
  return axios.post(`${baseURL}/quotationEdit`, quotation);
}

export function DeliveryOrder(delivery) {
  return axios.get(`${baseURL}/deliveryDetail`, {
    params: {
      id: delivery,
    },
  });
}
export function Deliveryconfirm(id, operator_id) {
  return axios.get(`${baseURL}/deliveryConfirm`, {
    params: {
      order_id: id,
      operator_id: operator_id,
    },
  });
}

//客户端接口
export function Quotationreply(id, status) {
  return axios.get("http://friday.nat100.top/quotationReply", {
    params: {
      id: id,
      status: status,
    },
  });
}
export function Deliveryreceive(record_id) {
  return axios.get("http://friday.nat100.top/deliveryReceive", {
    params: {
      record_id: record_id,
    },
  });
}
export function Orderpay(id) {
  return axios.get("http://friday.nat100.top/orderPay", {
    params: {
      id: id,
    },
  });
}
