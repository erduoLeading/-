// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 序号
    index: {
      type: Number,
      observer: function(newVal, oldVal) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: Number,
    month: String,
    _index: '',
    monthes: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
  },
  // dom还未挂载
  attached() {
    let y = new Date().getFullYear()
    let m = this.data.monthes[new Date().getMonth()]
    this.setData({
      year: y,
      month: m
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
