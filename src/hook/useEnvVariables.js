// 定义自定义hook
export default function useEnvVariables() {
  // 创建ref来存储环境变量的值
  const port = ref(import.meta.env.VITE_APP_PORT);
  const baseApi = ref(import.meta.env.VITE_APP_BASE_API);
  const baseFileApi = ref(import.meta.env.VITE_APP_BASE_FILE_API);
  const serviceApi = ref(import.meta.env.VITE_APP_SERVICE_API);

  // 返回环境变量的值
  return {
    port,
    baseApi,
    baseFileApi,
    serviceApi,
  };
}
