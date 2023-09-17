import axios from "axios";


// process get request
const getRequest = (url) => {
    const token = sessionStorage.getItem("accessToken");
    return axios.get(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}

// process post request
const postRequest = (url, data) => {
    const token = sessionStorage.getItem("accessToken");
    return axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// process put request
const putRequest = (url, data) => {
    const token = sessionStorage.getItem("accessToken");
    return axios.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// process delete request
const deleteRequest = (url) => {
    const token = sessionStorage.getItem("accessToken");
    return axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export { getRequest, postRequest, putRequest, deleteRequest }
