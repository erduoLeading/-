// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onJump(){
      // 获取bid
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `/pages/bookDetail/bookDetail?bid=${bid}`,
      })
    }
  }
})
