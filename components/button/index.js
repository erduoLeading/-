// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true,
  },
  properties: {
    // 根据需要开放的能力不同，此处显示不同的值
    openType: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  attached() {
    
  },
  methods: {
    // 用于发送用户的信息，提供外界页面使用
    getuserinfo(event) {
      this.triggerEvent('getuserinfo', {msg: event.detail})
    }
  }
})
