// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloadPosterBg:"../../images/sharedear.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  wxPromisify:function(fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) {
          resolve(res)
        }

        obj.fail = function (res) {
          reject(res)
        }

        fn(obj)
      })
    }
  },
  onLoad: function (options) {
    const wxGetImageInfo = this.wxPromisify(wx.getImageInfo)
    var that = this;
    
    Promise.all([
      // promise1
      wxGetImageInfo({
        src: '../../images/sharedear.jpg'
      }),
    ]).then(res => {
      console.log(res)
      console.log()
      const ctx = wx.createCanvasContext('shareCanvas')
      // 底图
      ctx.drawImage('../../'+res[0].path, 0, 0, 320, 500)
      ctx.stroke()
      ctx.draw()
    })

  },
  shareBtn:function(){
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})