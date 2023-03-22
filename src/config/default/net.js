/**
 * @description 导出默认网路配置
 **/
const isDev = process.env.NODE_ENV === "development";
const network = {
  baseUrl: isDev ? "http://localhost:8083/api" : "http://localhost:8083/api"
};
module.exports = network;
