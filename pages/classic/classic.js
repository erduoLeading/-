import { LikeModel } from '../../models/like.js'
import { ClassicModle } from '../../models/classic.js'
// 初始化请求类
let likeModel = new LikeModel()
let classicModel = new ClassicModle()
Page({ 
  data: {
    classic: null, // 期刊信息
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(data=> {
      this.setData({
        classic: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
   
  },
  // 点餐或取消赞数据修改请求
  onLike: function(event) {
    // 发送数据请求
    likeModel.setLike(event.detail.behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext(event) {
    if (this.data.latest) {
      return wx.showToast({
        title: '已经是最新的一期了',
        icon: 'none'
      })
    }
   this._updateClassic('next')
  },
  onPrevious(event) {
    if (this.data.first) {
      return wx.showToast({
        title:'已经是第一期了',
        icon: 'none'
      })
    }
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPrevious) {
    classicModel.getClassic(this.data.classic.index, nextOrPrevious,(data) => {
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data,
        first: classicModel.isFirst(data.index),
        latest: classicModel.isLatest(data.index)
      })
    })
  },
  // 获取点赞状态和点赞人数
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (data)=>{
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
  }
})