// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: [
    'tag-class'
  ],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    text: String
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
    onTap(event){
      const text = this.properties.text
      this.triggerEvent('tapping', { text})
    }
  }
})
