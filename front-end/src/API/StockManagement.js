import axios from 'axios'
const baseURL = "http://localhost:8080";
export function getMaterialStock (id) {
    return axios.get(`${baseURL}/getMaterialStock`, { 
        params: {
            materialID: id,
          },
});
}
export function getHistoryStock (id,loc) {
    return axios.get(`${baseURL}/getHistoryStock`, { 
        params: {
            materialID: id,
            storageLocation:loc
          },
});
}


