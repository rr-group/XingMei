var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

// pages/bannerDetails/bannerDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    nullhits:true,
  },
  buyer: function () {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { },
      fail(res) { }
    })
  },
  
  //点击立即购买
  //点击我显示底部弹出框
  clickme: function (res) {
    var userinfos = res.detail.userInfo;
    if (userinfos != undefined) {
      //下单
      util.requestApi({
        url: 'trade/order',
        data: {
          productId: 1
        },
        type: 'post',
        success: res => {
          //还有未支付的订单
          if (res == "HasNoPayOrder") {
            wx.showToast({
              title: '该产品还有未支付的订单，请勿重复下单！',
              icon: 'none',
              duration: 3000,
              success: function () {
                wx.navigateTo({
                  url: '../../pages/order/order?id=1'
                });
              }
            });
          } else {
            wx.navigateTo({
              url: '../../pages/order/order?id=1'
            });
          }
        }
      });
    }
    

    //this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  clonesbuy: function (options) {
    this.setData({
      showModalStatus: false, //弹窗隐藏
      nullhits: false, //弹窗显示
    })
  },
  // 点击跳转到代付款页
  BounsClones(e) {
      wx.navigateTo({
        url: '../../pages/order/order?id=' + "1"
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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