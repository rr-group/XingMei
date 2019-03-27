var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    //状态数量
    statusCount:{
        waitingPayment:0,
        paid:0,
        sended:0,
        done:0
    },
    tabbar: {},
    name: "纯老师",
    mine: [{
      url:"../../pages/bonus/bonus",
        img: "../../images/icon_bonus_center.png",
        text: "我的奖金"
      },
      {
        url: "../../pages/myMask/myMask",
        img: "../../images/icon_mask_center.png",
        text: "我的面膜"
      },
      {
        url: "../../pages/group/group",
        img: "../../images/icon_share_center.png",
        text: "我的团队"
      }
    ]
  },
  onGotUserInfo: function (e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo
    });
  },
  addressClick: function(e) {
    wx.navigateTo({
      url: '../../pages/addressList/addressList',
    })
  },

  //事件处理函数
  toOrder: function(e) {
    var index = e.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: '../../pages/order/order?id=' + index
    })
  },
  onLoad: function() {
    app.editTabbar();
    util.requestApi({
      url:'trade/order/status/count',
      success:res=>{
          var statusCount = {
              paid: res.Paid || 0,
              waitingPayment: res.WaitingPayment || 0,
              sended: res.Sended || 0,
              done: res.Done || 0
          };
        this.setData({
            statusCount:statusCount
        });
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
  }
})