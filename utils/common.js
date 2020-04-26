// 随机函数
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

// 时间节流函数
const throttle = function(fn, delay) {
  const _self = this
  let timeId = null
  let firstTime = true
  return function() {
    const _args = arguments
    if (firstTime) {
      fn.apply(_self, _args)
      firstTime = false
      return
    }
    if (timeId) {
      return
    }
    timeId = setTimeout(() => {
      fn.apply(_self, _args)
      timeId = null
    })

  }
}

// promise转换工具
const promisic = function (fn) {
  return function(params={}) {
    return new Promise((resolve, reject)=>{
      const _args = Object.assign(params,{
        success:(res)=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      })
      fn(_args)
    })
  }
}
export {
  random,
  throttle,
  promisic
}