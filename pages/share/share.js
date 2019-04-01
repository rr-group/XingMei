// pages/share/share.js
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloadPosterBg: "../../images/sharedear.jpg",
    avatarUrl: "",
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onGotUserInfo: function(e) {
    console.log(e)
  },
  wxPromisify: function(fn) {
    return function(obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function(res) {
          resolve(res)
        }

        obj.fail = function(res) {
          reject(res)
        }

        fn(obj)
      })
    }
  },
  onLoad: function(options) {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //用户已经授权过
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
              let promise1 = new Promise(function(resolve, reject) {
                wx.getImageInfo({
                  src: that.data.downloadPosterBg,
                  success: function(res) {
                    resolve(res);
                  }
                })
              });
              // let promise2 = new Promise(function (resolve, reject) {
              //   wx.getImageInfo({
              //     src: that.data.avatarUrl,
              //     success: function (res) {
              //       resolve(res);
              //     }
              //   })
              // });

              Promise.all([
                promise1
              ]).then(res => {
                console.log(res)
                that.drawImage(res)
              })

            }
          })
        }
      }
    })
    // const wxGetImageInfo = this.wxPromisify(wx.getImageInfo)
    // const wxGetImageInfoa = this.wxPromisify(wx.getImageInfo)


  },
  drawImage: function(res) {
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    ctx.drawImage('../../' + res[0].path, 0, 0, 320, 500)
    // //头像
    ctx.save() // 对当前区域保存
    ctx.beginPath() // 开始新的区域
    ctx.arc(60, 120, 28, 0, 2 * Math.PI, true);
    ctx.clip(); // 从画布上裁剪出这个圆形
    ctx.drawImage(this.data.avatarUrl, 30, 90, 60, 64) // 把图片填充进裁剪的圆形
    ctx.restore() // 恢复
    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#000000') // 文字颜色：黑色
    ctx.setFontSize(13) // 文字字号：12px
    ctx.fillText(this.data.nickName, 114, 115)
    ctx.setFontSize(14) // 文字字号：14px
    ctx.fillText("我为第二肌代言", 145, 135)
    ctx.stroke()
    ctx.draw()
  },
  shareBtn: function() {
    const wxCanvasToTempFilePath = this.wxPromisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = this.wxPromisify(wx.saveImageToPhotosAlbum)
    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      return wxSaveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
    }).then(res => {
      wx.showToast({
        title: '已保存到相册'
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})