// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
        
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes("iPhone X")
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
      clickEvent:function(e){ 
          wx.navigateTo({
              url: '/pages/share/share',
          })
      },
    //点击分享授权
    bindGetUserInfo:function(e){
      console.log(e)
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        wx.navigateTo({
          url: '/pages/share/share',
        })
      } else {
        //用户按了拒绝按钮
      }
    },
    //点击我的授权
    myaGetUserInfo: function (e) {
      console.log(e)
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        wx.navigateTo({
          url: '/pages/index/index',
        })
      } else {
        //用户按了拒绝按钮
      }
    },
  }
})
