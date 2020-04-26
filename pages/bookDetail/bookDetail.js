// pages/bookDetail/bookDetail.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0,
    // 控制真实输入框是否显示
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const bid = options["bid"]
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    wx.showLoading()
    Promise.all([detail, comments, likeStatus])
    .then(res=>{
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })

  },
  // 设置书籍喜欢
  onLike(event) {
    const status = event.detail.behavior
    likeModel.setLike(status, this.data.book.id, 400)
  },
  // 显示输入框
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  // 取消输入短评
  onCancel() {
    this.setData({
      posting: false
    })
  },
  // 输入短评
 async onPost(event) {
    const text = event.detail.text || event.detail.value
    // 短评验证
    if (!text.length) return
    if (text.length > 12) {
      wx.showToast({
        title: '短评内容过长',
        icon: 'none',
        duration: 1500
      })
      return
    }
    // 获取数据
    const newContent = {
      content: text,
      nums: 1
    }
   
    // 发送评论请求
     await bookModel.addBookComment(this.data.book.id, newContent.content)
      wx.showToast({
        title: '+1',
        icon: 'none',
        duration: 1500
      })
      // 实现dom变化
      this.data.comments.unshift(newContent)
      this.setData({
        comments: this.data.comments,
        posting: false
      })
  },
  // 确认输入短评

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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})