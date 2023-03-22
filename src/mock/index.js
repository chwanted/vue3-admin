
/**
 * 是否为生产环境
 * 
 * @return boolean
 */
 export const isNotProduction = () => {
  return process.env.NODE_ENV !== 'production'
}

const useMock = true // 后端暂无接口使，一直使用mock(保证线上预览能正常使用)

if (useMock) {
  const Mock = require('mockjs2')
  require('./services/user')
  require('./services/role')
  Mock.setup({
    timeout: 1000
  })
}

