//存储用户授权信息
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