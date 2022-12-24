import axios from "axios";
const baseUrl = "/api/blogs";

let auth = { Authorization: "" };

function setAuth(token) {
  auth.Authorization = `bearer ${token}`;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(data) {
  const config = { headers: auth };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
}

const blogService = { getAll, create, setAuth };
export default blogService;
