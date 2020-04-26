import { config } from '../config.js'
import { errorCode } from '../errorCode.js'
class Http {
  request({ url, data = {}, method = "GET"}) {
    return new Promise((resolve, reject) =>{
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.baseURL + url,
      method,
      data,
      header: {
        "content-type": 'application/json',
        "appkey": config.appKey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        }
        else {
          reject()
          this.showErrorCode(res.data.error_code)
        }
      },
      fail: (err) => {
        reject()
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
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: errorCode[key],
      duration: 2000,
      icon: 'none'
    })
  }
}
export { Http }