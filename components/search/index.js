// components/search/index.js
import { HistoryModel } from '../../models/history.js'
import { BookModel } from '../../models/book.js'
const historyModel = new HistoryModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 历史搜索关键词
    historyWords: Array,
    // 热门搜索关键词
    hotWords: Array,
    // 搜索结果的书籍
    dataArray: Array,
    // 是否显示初次加载的loading
    loadingCenter: Boolean,
    // 是否显示加载更多的Loading
    loading: Boolean,
    // 是否存在搜索结果
    noneResult: Boolean,
    // 到达底部加载
    more: {
      type: String,
      observer: '_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    history: wx.getStorageSync('q') || '暂无历史记录',
    // 控制搜索书籍是否显示
    searching: false,
    q: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多
    _load_more() {
     if (this.data.q == '') {
       return
     }
      const start = this.data.dataArray.length
     this.triggerEvent('loadMore', {q:this.data.q,start})
    },
    // 隐藏搜索
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },
    // 搜索
    onConfirm(event) {
      // 添加历史缓存 1.dom添加, 数据请求(storage添加,组件参数传出,数据回流)，
      const q = event.detail.value || event.detail.text
      this.data.historyWords.unshift(q)
      historyModel.addToHistory('q', q)
      this.triggerEvent('search', { q})

      // 书籍显示 1.数据请求(数据填充)，dom显示(dom绑定数据修改)
        this.setData({
          searching: true,
          q: q
        })
    },
    // 清空搜索结果
    onDelete() {
      console.log("清空")
      this.setData({
        searching: false,
        q: ''
      }) 
      this.triggerEvent('delete')
    }
  }
})
