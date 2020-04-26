// pages/book/book.js
// book请求方法
import {
  BookModel
} from '../../models/book.js'
import {
  HistoryModel
} from '../../models/history.js'
import {
  random,
  throttle
} from '../../utils/common.js'
import {
  paginationBev
} from '../../components/behaviors/pagination.js'

const bookModel = new BookModel()
const historyModel = new HistoryModel()
Page({

  /**
   * 页面的初始数据
   */
  behaviors: [paginationBev],
  data: {
    // 书籍列表
    books: [],
    // 控制搜索组件是否显示
    searching: false,
    // 历史搜索
    historyWords: [],
    // 热门搜索
    hotWords: [],
    // 搜索到的书籍
    dataArray: [],
    // 提示到达底部加载更多
    more: 0,
    // 控制是否加载更多
    loading: false,
    // 控制加载更多的loading是否显示
    loadingCenter: false
  },

  async onLoad(options) {
    const books =  await bookModel.getHotList()
    this.setData({
      books
    })
  },
  // 打开书籍详情
  openBookDetail(item) {
    console.log(item)
  },
  // 打开搜索组件
  onSearching() {
    this._showResult()
    // 请求搜索数据
    this.setData({
      historyWords: historyModel.getHistory()
    })
    // 请求热门搜索数据
    historyModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })


  },
  onCancel() {
    this._hidResult()
    this.initialization()
  },

  // 添加历史关键词
  addToHistory(event) {
    this.setData({
      historyWords: historyModel.getHistory()
    })
  },

  // confirm触发搜索书籍
  async search(event) {
    // 添加历史关键词
    this.addToHistory(event)
    // 搜索书籍: 1.数据请求（获取组件传递参数)，数据填充，实现dom变化(dom绑定数据修改)
    const q = event.detail.q
    this._showLoadingCenter()
    this.initialization()
    const {books,total} = await bookModel.getSearchBooks(q)
    this.setMoreData(books)
      this._hidLoadingCenter()
      this.setTotal(total)
  },
  // 页面到达底部触发
  onReachBottom: function() {
    this.setData({
      more: random(16)
    })
  },
  onDelete() {
    this.initialization()
  },
  
  // 加载更多书籍
  async loadMore(event) {
    // 时间节流加载书籍
    // throttle(this.throttlLoad, 500)(event)

    // 锁节流加载书籍 1.在加载禁止新数据加载 2.加载完毕允许新数据加载
    if (this.isLocked()) return
    const q = event.detail.q
    if (this.hasMore()) {
      console.log("加载更多")
      this.locked()
      const {books} = await bookModel.getSearchBooks(q, this.getCurrentStart())
      this.setMoreData(books)
        this.unlocked()
    }
  },
 
  // 显示搜索组件
  _showResult() {
    this.setData({
      searching: true
    })
  },
  // 隐藏搜索组件
  _hidResult() {
    console.log("隐藏")
    this.setData({
        searching: false
      })
  },
  // 显示中间loading
  _showLoadingCenter() {
    this.setData({
      loadingCenter: true
    })
  },
  _hidLoadingCenter() {
    this.setData({
      loadingCenter: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})