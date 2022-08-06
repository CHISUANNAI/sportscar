//存储用户当前登录状态
export function getToken() {
    return localStorage.getItem("token");
  }
export function setToken(token) {
    return localStorage.setItem("token", token);
}
export function clearToken() {
    localStorage.removeItem("token");
}
export function isLogined() {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
}