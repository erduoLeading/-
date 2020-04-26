// pages/my/my.js
import { authorizationBeh } from '../../components/behaviors/authorization.js'
import { ClassicModle } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'
const bookModel = new BookModel()
const classicModel = new ClassicModle()

Page({
  /**
   * 页面的初始数据
   */
  behaviors: [authorizationBeh],
  data: {
    // 按钮开放类型
    openType: 'getUserInfo',
    // 书籍数量
    bookCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 已经授权，直接显示头像
    this.headAuthorize2()
    this.getMyBookCount()
    this.getMyFavor()
  },
  // 授权,显示头像
  getuserinfo(event) {
   const userInfo = event.detail.msg.userInfo
   // 不点击授权则不设置
   if (!userInfo)  return
    this.setUserInfo(userInfo)
  },
  // 跳到关于
  onJumpToAbout() {
    wx.navigateTo({
      url:"/pages/about/about",
    })
  },
  // 跳到学习
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  // 获取书籍数量
  getMyBookCount() {
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount: res.count
      })
    })
  },
  // 获取喜欢
  getMyFavor() {
    classicModel.getMyFavor(res=>{
      this.setData({
        classics:res
      })
    })
  },
  // 跳转到具体的细节页面
  onJumpToDetail() {
    wx.navigateTo({
      url: '/pages/',
    })
  },
  // 
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic/classic?cid=${cid}&type=${type}`
    })
  }
})