import {
  Http
} from '../utils/http.js'
class ClassicModle extends Http {
  // 获取期刊数据
  getLatest(sCallback) {
    this.request({
      method: 'GET',
      url: 'classic/latest',
      success:(data)=>{
        sCallback(data)
        this._setLatestIndex(data.index)
        wx.setStorageSync(this._getKey(data.index),data)
      }
    })
  }
  // 获取上一期或者下一期数据
  getClassic(index, nextOrPrevious, sCallback) {
    let key = this._getKey(nextOrPrevious === 'next' ? index + 1 : index - 1)
    let data = wx.getStorageSync(key)
    // 判断是否有缓存数据 
    if (!data) {
      console.log("数据不存在")
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (data) => {
          sCallback(data)
          wx.setStorageSync(this._getKey(data.index), data)
        }
      })
    } else {
      console.log("不发送网络请求")
      sCallback(data)
    }
  }
  // 获取我的最爱
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success:success
    }
    this.request(params)
  }
  // 获取上一期期刊数据
  // getPrevious(index,sCallback,) {
  //   this.request({
  //     url: 'classic/' + index + '/previous',
  //     success:(data) => {
  //       sCallback(data)
  //     }
  //   })
  // }
  // // 获取下一期期刊数据
  // getNext(index, sCallback) {
  //   this.request({
  //     url: 'classic/' + index + '/next',
  //     success:(data) => {
  //       sCallback(data)
  //     }
  //   })
  // }

  // 判断当前页的辅助函数 isFirst, isLast
  isFirst(index) {
    return index == 1 ? true : false
  }
  isLatest(index) { 
    return this._getLatestIndex() == index ? true: false 
  }
  // 将最新一期序号保存起来用于判断是否到达最新一期
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  //获取缓存中的键名
  _getKey(index) {
    return 'classic-' + index
  }
}
export {
  ClassicModle
}