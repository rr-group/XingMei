var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        idBtn: 0,
        nullHouse: true,  //先设置隐藏
        nullhits: true, //先设置隐藏
        topList: ["0", "0", "0"],
        telValue: '',
        getInput: '',
        desc: '', //文案获取面膜
        totalList: [],  //累计面膜列表
        sendList: [], //发货列表
        myBounsTitle: "如何领取面膜",
        accumulateTitle: "累计面膜",
        withdrawTitle: "已发面膜"
    },

    // 点击如何获取面膜
    bindbonus() {
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 0
        });
    },
    BounsClones() {
        this.setData({
            nullhits: true //弹窗隐藏
        });
    },
    // 点击累计面膜
    accumulate() {
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 1
        });
    },
    // 点击已发面膜
    withdraw() {
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 2
        });
    },
    //关闭弹框
    bindclones() {
        this.setData({
            nullHouse: true //弹窗隐藏
        });
    },
    //点击发货
    tapSend: function () {
        var remainCount = parseInt(this.data.topList[2]);
        if (remainCount < 5) {
            wx.showToast({
                title: '5片以上才能发货！',
                icon: 'none',
                duration: 1200
            });
            return;
        }
        var count = remainCount - remainCount % 5;
        //设置订单缓存
        wx.setStorageSync('order', {
            productId: 2,
            count: count
        });
        wx.navigateTo({
            url: '../../pages/confirmOrder/confirmOrder'
        });
    },
    onLoad: function () {
        var that = this;

        wx.showLoading({
            title: '加载中'
        });

        //获取用户社交信息
        util.requestApi({
            url: 'user/social',
            type: 'get',
            success: res => {
                that.setData({
                    topList: [res.totalGiftCount, res.usedGiftCount, res.totalGiftCount - res.usedGiftCount-res.usingGiftCount]
                });
                wx.hideLoading();
            }
        });
        //延迟获取记录
        setTimeout(function () {
            //累计奖金
            util.requestApi({
                url: 'trade/gift/log',
                data: {
                    operate: 1
                },
                success: res => {
                    that.setData({
                        totalList: res.data
                    });
                }
            });
            //已提现奖金
            util.requestApi({
                url: 'trade/gift/log',
                data: {
                    operate: -1
                },
                success: res => {
                    that.setData({
                        sendList: res.data
                    });
                }
            });
            //文案-如何获取面膜
            util.requestApi({
                url: 'site/article/2',
                success: res => {
                    that.setData({
                        desc: res.content
                    });
                }
            });
        }, 1000);
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
});