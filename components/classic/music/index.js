import { classicBehavior } from '../classic-beh.js'
// 获取音乐播放管理器
const musicManger = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [ classicBehavior ],
  properties: {
    // 音乐url
    src: String 
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached:function(event) {
    // 控制播放状态图标
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        // 播放
        //  if(!musicManger.src) {
           musicManger.title = 'music'
           musicManger.src = this.properties.src
        //  } else {
          //  musicManger.play()
        //  }
      } else {
        // 暂停
        musicManger.pause()
      }
      // 控制图标状态取反
      this.setData({
        playing: !this.data.playing
      })
      console.log(musicManger.src)
    },
    // 播放按钮的控制
    _recoverStatus: function() {
      if (musicManger.paused) {
        this.setData({
          playing: false
        })
        return
      } 
      if (musicManger.src && musicManger.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    // 后台播放器和只定义播放器的联动控制
    _monitorSwitch: function() {
      musicManger.onPlay(()=>{
        this._recoverStatus()
      })
      musicManger.onPause(() => {
        this._recoverStatus()
      })
      musicManger.onStop(() => {
        this._recoverStatus()
      })
      musicManger.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
