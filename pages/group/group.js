var util = require("../../utils/util.js");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        idBtn: 0,
        list: [],
        nullhits: true, //先设置隐藏
        desc: ''//获取团队文案
    },
    toChild: function (e) {
        wx.navigateTo({
            url: '/pages/groupChild/groupChild?name=' + e.currentTarget.id
        });
    },
    // 点击如何获取奖金
    tapOpen() {
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 2
        });
    },
    tapClose() {
        this.setData({
            nullhits: true //弹窗隐藏
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        //推荐用户列表
        util.requestApi({
            url: 'user/social/recommendUser',
            success: res => {
                that.setData({
                    list: res.data
                });
            }
        });
        //文案-如何获取团队
        util.requestApi({
            url: 'site/article/3',
            success: res => {
                that.setData({
                    desc:res.content
                });
            }
        });
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