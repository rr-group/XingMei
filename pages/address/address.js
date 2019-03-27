var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    region: ['北京市', '北京市', '海淀区'],
    customItem: "全部",
    name: "",
    mobile: "",
    address: "",
    isDefault:false,
  },
  //保存并使用
  formSubmit: function (e) {
    var that = this;
    var id = that.data.id;
    let data = e.detail.value;
    var province = that.data.region[0];
    var city = that.data.region[1];
    var area = that.data.region[2];
    var address = data.address;
    //验证数据
    if (!data.name) {
      util.error('请填写收货人姓名!');
      return;
    }
    if (!data.mobile) {
      util.error('请填写收货人手机!');
      return;
    }
    if (area == '全部') {
      util.error('请选择省市区!');
      return;
    }
    if (!address) {
      util.error('请选择详细地址!');
      return;
    }

    //提交数据
    util.requestApi({
      url: 'user/address' + (id? '/' + id: ''),
      type: id? 'put': 'post',
      data: {
        id:id,
        name: data.name,
        mobile: data.mobile,
        province:province,
        city:city,
        area:area,
        address: address,
        isDefault:true
      },
      success: res => {
        wx.showToast({
          title: "保存成功！",
          icon: 'none',
          duration: 1000,
          success: function (res) {
            setTimeout(function () {
              wx.navigateTo({
                url: '../addressList/addressList',
              });
            }, 1000);
          }
        });
      }
    });

  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id){
      wx.showLoading({
        title: '加载中',
      });
      util.requestApi({
        url:'user/address/' + options.id,
        success:res=>{
          that.setData({
            id: res.id,
            name:res.name,
            mobile:res.mobile,
            address:res.address,
            region:[res.province,res.city,res.area],
            isDefault:res.isDefault
          });
          wx.hideLoading();
        }
      });
    }
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