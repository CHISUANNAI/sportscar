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

/**
 * 获取列表
 */
export function Employeelist() {
  return axios.get(`${baseURL}/users/load`);
}
 export function Supplierlist() {
  //  return axios.get(`${baseURL}/users/load`);
 }
export function Materiallist() {
  // return axios.get(`${baseURL}/users/load`);
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
 export function Supplierdelete() {
  //  return axios.get(`${baseURL}/users/load`);
 }
 export function Materialdelete() {
  //  return axios.get(`${baseURL}/users/load`);
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
export function Supplieredit() {
  // return axios.get(`${baseURL}/users/load`);
}
export function Materialedit() {
  // return axios.get(`${baseURL}/users/load`);
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
 export function Supplieradd() {
  //  return axios.get(`${baseURL}/users/load`);
 }
 export function Materialadd() {
  //  return axios.get(`${baseURL}/users/load`);
 }

