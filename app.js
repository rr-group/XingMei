var config = require("utils/config.js");
var util = require("utils/util.js");

//app.js
App({
  onLaunch: function () {
    // 隐藏系统tabbar
    this.hidetabbar();
    // 获取设备信息
    this.getSystemInfo();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    var code = "";
    // 登录
    wx.login({
      success: res => {
        code = res.code;
        util.requestApi({
          url: 'wechat/applet/login',
          data: {
            code: code,
            appId: config.appId
          },
          type: 'GET',
          success: function (res) {
            // 绑定用户信息
            // if (res.id <= 0) {
            //     wx.showToast({
            //         title: "请先完善基础信息！",
            //         icon: 'none',
            //         duration: 1000,
            //         success: function () {
            //             setTimeout(function () {
            //                 wx.navigateTo({
            //                     url: '../user/bind',
            //                 });
            //             }, 1000);
            //         }
            //     });
            // }
            wx.setStorageSync("currentUser", res);
            that.globalData.appUser = res;
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            console.log(res);
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo;
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
        if (res.authSetting['scope.userInfo']) {
          
        }
      }
    })
  },
  //自己对wx.hideTabBar的一个封装
  hidetabbar() {
    wx.hideTabBar({
      fail: function () {
        setTimeout(function () { // 做了个延时重试一次，作为保底。
          wx.hideTabBar()
        }, 500)
      }
    });
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    userInfo: null,
    appUser: null,
    systemInfo: null,//客户端设备信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#d288c3",
      "list": [
        {
          "pagePath": "/pages/home/home",
          "iconPath": "icon/icon_homes.png",
          "selectedIconPath": "icon/icon_home_HLs.png",
          "text": "首页"
        },
        {
          "pagePath": "../home/home",
          "iconPath": "icon/icon_releases.png",
          "isSpecial": true,
          "text": "分享"
        },
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/icon_mines.png",
          "selectedIconPath": "icon/icon_mine_HLs.png",
          "text": "我的"
        }
      ]
    }
  }
})