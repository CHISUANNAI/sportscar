import axios from "axios";
const baseURL = "http://localhost:8080";

//用户登录信息验证
export function loginApi(loginInfo) {
  return axios.get(`${baseURL}/users/login`, {
    params: {
      userName: loginInfo.name,
      password: loginInfo.password
    }
  });
}

//用户密码修改
export function pwEditApi(newPwInfo) {
  return axios.get(`${baseURL}/users/changePw`, {
    params: {
      userName: newPwInfo.userName,
      old: newPwInfo.old,
      password: newPwInfo.password
    }
  });
}

/**
 * 获取列表
 */
export function Employeelist() {
  return axios.get(`${baseURL}/users/load`);
}
export function Supplierlist() {
  return axios.get(`${baseURL}/suppliers/load`);
}
export function Materiallist() {
  return axios.get(`${baseURL}/materials/load`);
}


/**
 * 删除信息
 */
export function Employeedelete(userID) {
  return axios.get(`${baseURL}/users/delete`, {
    params: {
      userID: userID
    }
  });
}
export function Supplierdelete(supplierID) {
  return axios.get(`${baseURL}/suppliers/delete`, {
    params: {
      supplierID: supplierID
    }
  });
}
export function Materialdelete(materialID) {
  return axios.get(`${baseURL}/materials/delete`, {
    params: {
      materialID: materialID
    }
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
    }
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
    }
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
    }
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
    }
  });
}
export function Supplieradd(value) {
  return axios.get(`${baseURL}/suppliers/create`, {
    params: {
      supplierName: value.supplierName,
      region: value.region,
      language: value.language,
      clerkVendor: value.clerkVendor
    }
  });
}
export function Materialadd(value) {
  return axios.get(`${baseURL}/materials/create`, {
    params: {
      materialName: value.materialName,
      description: value.description,
      weight: value.weight,
      factory: value.factory
    }
  });
}

//输入大订单id，加载没有开过发票的小订单id(发票管理)
export function showsubid(value){
  return axios.get(`${baseURL}/invoice/id`,{
    params:{
      orderID:value
    }
  });
}



