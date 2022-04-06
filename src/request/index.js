import axios from 'axios'

const service = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 10000
})

export default service