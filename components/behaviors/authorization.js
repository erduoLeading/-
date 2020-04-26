import {
  promisic
} from "../../utils/common.js"
const authorizationBeh = Behavior({
  data: {
    // 控制用户是否授权
    authorized: false,
    // 用户授权信息
    userInfo: {}
  },
  methods: {
    // 头像授权
    async headAuthorize2() {
      const data1 = await promisic(wx.getSetting)()
      if (data1.authSetting['scope.userInfo']) {
        const {userInfo} = promisic(wx.getUserInfo)()
        if (!userInfo) return
        this.setUserInfo(userInfo) 
      }
    },
    headAuthorize1() {
      promisic(wx.getSetting)()
        .then(data1 => {
          if (data1.authSetting['scope.userInfo']) {
            // 已经授权过
            return promisic(wx.getUserInfo)()
          }
        })
        .then(data2 => {
          if (!data2) return
          this.setUserInfo(data2.userInfo)
        })
    },
    // 不授权头像
    setUnauthorize() {
      this.setData({
        authorized: false
      })
    },
    // 授权设置头像信息
    setUserInfo(userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
      console.log("我的信息", userInfo)
    }
  }
})
export {
  authorizationBeh
}