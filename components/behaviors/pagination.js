const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noneResult: false,
    loading: false,
  },
  methods: {
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.setData({
        total: total,
        noneResult: total === 0 ? true: false
      })
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },
    initialization() {
      this.setData({
        total: null,
        dataArray: [],
        noneResult: false,
        loading: false
      })
    },
    // 是否有锁
    isLocked() {
      return this.data.loading == false ? false : true
    },
    // 锁住，不允许加载
    locked() {
      this.setData({
        loading: true
      })
    },
    // 解锁，允许加载
    unlocked() {
      this.setData({
        loading: false
      })
    },
  
  }
})

export {
  paginationBev
}