import axios from "axios";
import { hook } from "@/hook/useEnvVariables.js";
import { ElMessage } from "element-plus"; // 若使用Element UI等UI库处理提示

const { VITE_BASE_API } = hook();

// 创建Axios实例
const http = axios.create({
  baseURL: VITE_BASE_API, // 设置基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 添加全局请求头、处理身份验证Token等
    config.headers.common["Authorization"] = getToken(); // 假设有个getToken的方法获取token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对成功的HTTP响应进行处理
    if (response.data.success) {
      return response.data.data;
    } else {
      // 处理错误情况，例如显示错误消息
      ElMessage.error(response.data.message || "请求失败");
      return Promise.reject(new Error(response.data.message));
    }
  },
  (error) => {
    // 对HTTP请求错误进行处理
    ElMessage.error("网络异常，请稍后再试！");
    return Promise.reject(error);
  }
);

export default {
  // GET 请求封装
  get(url, config = {}) {
    return http.get(url, config);
  },

  // POST 请求封装
  post(url, data = {}, config = {}) {
    return http.post(url, data, config);
  },

  // PUT 请求封装
  put(url, data = {}, config = {}) {
    return http.put(url, data, config);
  },

  // DELETE 请求封装
  delete(url, config = {}) {
    return http.delete(url, config);
  },
};
