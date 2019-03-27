var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idBtn: 0,
    teamTitle:"如何获取团队",
    contentList: [
      {
        img: "http://img3.imgtn.bdimg.com/it/u=622491863,3622081462&fm=26&gp=0.jpg",
        name: "会飞的鴨子",
        num: 108
      },
      {
        img: "http://img3.imgtn.bdimg.com/it/u=622491863,3622081462&fm=26&gp=0.jpg",
        name: "愛吃的老虎",
        num: 10
      },
      {
        img: "http://img3.imgtn.bdimg.com/it/u=622491863,3622081462&fm=26&gp=0.jpg",
        name: "我是一只鱼",
        num: 6
      },
      {
        img: "http://img3.imgtn.bdimg.com/it/u=622491863,3622081462&fm=26&gp=0.jpg",
        name: "漂亮小公主",
        num: 2
      },
      {
        img: "http://img3.imgtn.bdimg.com/it/u=622491863,3622081462&fm=26&gp=0.jpg",
        name: "一到晚上就化妆",
        num: 0
      },
    ],
    nullhits: true, //先设置隐藏
    //获取
    Howget: [
      "每天过来签到和分享啊，分享成功之后就可以",
      "每天过来签到和分享啊，分享成功之后就可以",
      "每天过来签到和分享啊，分享成功之后就可以",
      "每天过来签到和分享啊，分享成功之后就可以",
      "每天过来签到和分享啊，分享成功之后就可以",
      "每天过来签到和分享啊，分享成功之后就可以",
    ],
  },
  gotableinfo: function(e) {
      wx.navigateTo({
        url: '/pages/groupChild/groupChild?name=' + e.currentTarget.id,
      })
  },
  // 点击如何获取奖金
  bindbonus(e) {
    var that = this;
    this.setData({
      nullhits: false, //弹窗显示
      idBtn: 2
    })
  },
  BounsClones() {
    this.setData({
      nullhits: true, //弹窗隐藏
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    util.requestApi({
      url:'user/social/recommendUser',
      success:res=>{
        console.log(res);
      }
    });
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