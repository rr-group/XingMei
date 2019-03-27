var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

// pages/bonus/bonus.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        idBtn: 0,
        nullHouse: true,  //先设置隐藏
        nullhits: true, //先设置隐藏
        topList: ["0", "0", "0"],
        withdrawMoney: '',
        getInput: '',
        //获取
        Howget: [
            "每天过来签到和分享啊，分享成功之后就可以",
            "每天过来签到和分享啊，分享成功之后就可以",
            "每天过来签到和分享啊，分享成功之后就可以",
            "每天过来签到和分享啊，分享成功之后就可以",
            "每天过来签到和分享啊，分享成功之后就可以",
            "每天过来签到和分享啊，分享成功之后就可以",
        ],
        //累计佣金
        totalBrokerage: [],
        //已提现佣金
        withdrawList: [],
        //可提现金额
        remainAmount: 0,
        myBounsTitle: "如何获取奖金",
        accumulateTitle: "累计奖金",
        withdrawTitle: "已提现奖金"
    },
    //获取input 提现的数
    getInput: function (e) {
        this.setData({
            withdrawMoney: e.detail.value
        });
    },
    // 点击如何获取奖金
    bindbonus(e) {
        var that = this;
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 0
        });
    },
    BounsClones() {
        this.setData({
            nullhits: true, //弹窗隐藏
        });
    },
    // 点击累积奖金
    accumulate(e) {
        var that = this;
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 1
        });
    },
    // 点击已提现奖金
    withdraw(e) {
        var that = this;
        this.setData({
            nullhits: false, //弹窗显示
            idBtn: 2
        });
    },
    //提现
    bindSignIn(e) {
        var that = this;
        this.setData({
            nullHouse: false //弹窗显示
        });
    },
    //确认提现
    tapWithdraw(e) {
        var that = this;
        console.log(that.data.remainAmount, that.data.withdrawMoney);
        if (that.data.remainAmount < that.data.withdrawMoney) {
            wx.showLoading({
                title: '提现金额不能大于可领取金额！'
            });
        } else {
            util.requestApi({
                url: 'trade/money/withdraw',
                type: 'post',
                data: {
                    money: that.data.withdrawMoney
                },
                success: res => {

                }
            });
        }
    },
    //关闭弹框
    bindclones() {
        this.setData({
            nullHouse: true //弹窗隐藏
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;

        wx.showLoading({
            title: '加载中'
        });

        //获取用户社交信息
        util.requestApi({
            url: 'user/social',
            success: res => {
                that.setData({
                    topList: [res.totalBrokerage, res.usedBrokerage, res.totalBrokerage - res.usedBrokerage],
                    remainAmount: res.totalBrokerage - res.usedBrokerage - res.usingBrokerage
                });
                wx.hideLoading();
            }
        });
        //延迟获取记录
        setTimeout(function () {
            //累计奖金
            util.requestApi({
                url: 'trade/money/log',
                data: {
                    operate: 1
                },
                success: res => {
                    console.log(res);
                    that.setData({
                        accumulate: res.data
                    });
                }
            });
            //已提现奖金
            util.requestApi({
                url: 'trade/money/log',
                data: {
                    operate: -1
                },
                success: res => {
                    that.setData({
                        withdrawList: res.data
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
})