var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isChoose: false,
        addressList: [],
    },
    // 编辑地址
    tapEdit: function (e) {
        wx.navigateTo({
            url: '../../pages/address/address?id=' + e.currentTarget.dataset.id
        });
    },
    /**
     * 新增地址
     * @param {object} e - 事件
     */
    tapAdd: function (e) {
        wx.navigateTo({
            url: '../../pages/address/address'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        var isChoose = wx.getStorageSync('address-choose'); 
        that.setData({
            isChoose: isChoose
        });
        util.requestApi({
            url: 'user/address',
            success: res => {
                
                that.setData({
                    addressList: res.data
                }); 
            }
        });
    },

    /**
     * 选中地址
     */
    addressChoose:function(e){
        var that = this;
        var index = e.currentTarget.dataset.id;
        if(that.data.isChoose){ 
            var chooseAddressList = JSON.stringify(that.data.addressList[index]);
            wx.navigateTo({
                url:'../../pages/confirmOrder/confirmOrder?address='+chooseAddressList,
            })
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