import {config} from '../config.js'
import {errorCode} from '../errorCode.js'
class Http {

  request(params) {
    // url, data, method,
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.baseURL + params.url,
      method: params.method,
      data: params.data,
      header: {
        "content-type": 'application/json',
        "appkey": config.appKey
      },
      success: (res) => {
        // console.log(res)
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        }
        else {
          this.showErrorCode(res.data.error_code)
        }
      },
      fail: (err) => {
        this.showErrorCode(1)
      }
    })

  }
  // 显示错误码
  showErrorCode(key) {
  if (!errorCode[key]) {
      wx.showToast({
        title: errorCode[1],
        duration: 2000,
        icon:'none'
      })
      return
    }
    wx.showToast({
      title: errorCode[key],
      duration: 2000,
      icon:'none'
    })
  }
}
export {Http}