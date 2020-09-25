import axios from 'axios'

const token = 'sVgQDCqc59IziuOmp0itL5Vk9seG3WZyzcgr1qMO'

const defaultConfig = {
  baseURL: 'https://www.yuque.com/api/v2',
  headers: {
    'User-Agent': 'blog-test',
    'X-Auth-Token': token
  }
}

const axiosInstance = axios.create(defaultConfig)

axiosInstance.interceptors.response.use(function(response){
  if(response.status === 200){
    return response.data
  }
}, function(error){

})

export default axiosInstance
