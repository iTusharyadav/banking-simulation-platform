import axios from "axios";

const token = sessionStorage.getItem("jwtToken");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;

// Use this instance for requests requiring existing JWT (except signup/login)
