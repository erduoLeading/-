import { Http } from '../utils/http-p.js'
class HistoryModel extends Http {
  // 历史队列关键词
  key = 'q'
  maxLength = 10
  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword',
      method: "GET",
    })
  }

  addToHistory(keyWord, value) {
    if (!value) return
    const historyArr = this.getHistory()
    if (!historyArr.includes(value)) {
      if (historyArr.length >= this.maxLength) {
        historyArr.pop() // 先进先出，栈
      }
      historyArr.unshift(value)
      wx.setStorageSync(keyWord, historyArr)
    }
  }
}
export { HistoryModel }