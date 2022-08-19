import axios from 'axios'
const baseURL = "http://localhost:8080";
export function getOrderStatus (id) {
    return axios.get(`${baseURL}/getOrderStatus`, { 
        params: {
            orderID: id,
          },
});
}
export function receiveProduct (id,subOrderID,storageLocation) {
    return axios.get(`${baseURL}/receiveProduct`, { 
        params: {
            orderID: id,
            subOrderID: subOrderID,
            storageLocation:storageLocation
          },
});
}
export function checkReceive (id) {
    return axios.get(`${baseURL}/checkReceive`, { 
        params: {
            orderID: id,
          },
});
}
export function checkAllReceive () {
    return axios.get(`${baseURL}/checkAllReceive`, { 
});
}


