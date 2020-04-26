import {
  Http
} from '../utils/http-p.js'
class BookModel extends Http {
  // 获取人们书籍首页数据
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  // 获取书籍喜欢人数
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
  // 获取书籍详情信息
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  // 获取书籍点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  // 获取评论
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
  // 添加书评
  addBookComment(bid, content) {
    return this.request({
      url: `book/add/short_comment`,
      method: "POST",
      data: {
        book_id: bid,
        content: content
      }
    })
  }
  // 搜索书籍
  getSearchBooks(q, start = 0, count = 20, summary = 0) {
    return this.request({
      url: 'book/search',
      data: {
        start,
        count,
        summary,
        q
      }
    })
  }
}

export {
  BookModel
}