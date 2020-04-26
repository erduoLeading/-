// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
    },
    like: {
      type:Boolean,
      value: false
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'/components/like/images/like.png',
    noSrc:'/components/like/images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      // 只读，阻止后面的一系列行为。
      if (this.properties.readOnly) return
      let like = !this.properties.like
      let count = this.properties.count
      count= like ? count + 1 : count - 1
      this.setData({
        like,
        count
      })
      // 激活事件，传递点赞数据修改请求
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {behavior}) // 事件名，传递的属性
    }
  }
})
