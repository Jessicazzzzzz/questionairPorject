import Mock from 'mockjs'
Mock.mock('/api/test', 'get', () => {
  return {
    code: 200,
    data: {
      name: `张三 ${Date.now()}`,
      age: 18,
      sex: '男',
    },
  }
})
