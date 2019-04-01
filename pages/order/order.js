var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalPrice: 0,           // 总价，初始为0
        selectAllStatus: true,   // 全选状态，默认全选
        selectarr: [],//选中数组
        // 全部
        allcommodity: [],
        // 待付款
        carts: [],
        // 待发货
        sendgoods: [],
        // 已发货
        shipped: [],
        //已完成
        offstocks: [],
        currentTab: 0
    },
    Commodityedit(e) {
        let index = 0;
        let arrayItem = this.data.carts;//获取循环数组对象
        for (let item of arrayItem) {
            //如果当前点击的对象id和循环对象里的id一致
            if (item.id === e.currentTarget.dataset.id) {
                //判断当前对象中的isShow是否为true（true为显示，其他为隐藏） 
                if (arrayItem[index].isShow === "" || arrayItem[index].isShow === undefined) {
                    arrayItem[index].isShow = "true";
                } else {
                    arrayItem[index].isShow = "";
                }
            }
            index++;
        }
        //将数据动态绑定 
        this.setData({
            carts: arrayItem
        })
    },
    // 计算总价
    getTotalPrice() {
        let carts = this.data.carts;                  // 获取购物车列表
        let total = 0;
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
            //if (carts[i].selected) {                   // 判断选中才会计算价格
            total += carts[i].price * carts[i].count;   // 所有价格加起来
            //}
        }
        this.setData({                                // 最后赋值到data中渲染到页面
            carts: carts,
            totalPrice: total
        });
    },
    // 点击选中事件
    selectList(e) {
        const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
        let carts = this.data.carts;
        console.log(carts)                 // 获取购物车列表
        const selected = carts[index].selected;         // 获取当前商品的选中状态
        carts[index].selected = !selected;   // 改变状态         
        this.setData({
            carts: carts
        });
        this.getTotalPrice();                           // 重新获取总价
    },
    /**
     * 购物车全选事件
     */
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;
        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAllStatus;
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        this.getTotalPrice();
    },

    // 导航切换监听
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            this.bindOrderList(e.target.dataset.current);
            that.setData({
                currentTab: e.target.dataset.current,
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     * @param {object} options -参数选项
     */
    onLoad: function (options) {
        showView: (options.showView === "true" ? true : false);
        var secondId = options.id || 0;
        this.setData({
            currentTab: secondId
        });
        this.bindOrderList(secondId);
    },
    //绑定订单列表
    //param:
    //   secondId:tab选项卡的索引
    bindOrderList: function (secondId) {
        var that = this;
        var status = null;
        switch (secondId) {
            case '0': //全部
                status = null;
                break;
            case '1': //待付款
                status = 50;
                break;
            case '2': //待发货
                status = 60;
                break;
            case '3': //已发货
                status = 80;
                break;
            case '4': //已完成
                status = 100;
                break;
        }
        //获取订单列表
        util.requestApi({
            url: 'trade/order',
            data: {
                status: status
            },
            success: res => {
                switch (secondId) {
                    case '0': //全部
                        that.setData({
                            allcommodity: res.data
                        });
                        break;
                    case '1': //待付款
                        that.setData({
                            carts: res.data,
                            totalPrice: res.data.length > 0 ? res.data[0].totalPrice : 0
                        });
                        break;
                    case '2': //待发货
                        that.setData({
                            sendgoods: res.data
                        });
                        break;
                    case '3': //已发货
                        that.setData({
                            shipped: res.data
                        });
                        break;
                    case '4': //已完成
                        that.setData({
                            offstocks: res.data
                        });
                        break;
                }
            }
        });
    },
    /**
     * 支付订单
     * */
    tapPay() {
        var order = this.data.carts[0];
        if (order) {
            util.requestApi({
                url: 'trade/order/' + order.name + '/pay/applet',
                type: 'post',
                data: {
                    openId: app.globalData.appUser.extend,
                    appId: config.appId,
                    DeviceInfo: '1', //商家号
                    Body: order.firstProduct.name,
                    Attach: '11', //附赠编号,
                    name: that.data.orderId
                },
                success: function (result) {
                    wx.requestPayment({
                        timeStamp: result.timeStamp,
                        nonceStr: result.nonceStr,
                        package: result.package,
                        signType: 'MD5',
                        paySign: result.paySign,
                        success() {
                            wx.showToast({
                                title: '支付成功',
                                duration: 1200
                            });
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '../../pages/order/order?id=2'
                                });
                            }, 1200);
                        },
                        fail(res) {
                            if (res.errMsg === "requestPayment:fail cancel") {
                                wx.showToast({
                                    title: '支付取消',
                                    duration: 1200
                                });
                            } else {
                                wx.showToast({
                                    title: '支付失败',
                                    image: '../../images/error.png',
                                    duration: 1200
                                });
                            }
                            console.log('pay-fail:', res);
                        }
                    });
                }
            });
        }
    },
    /**
     * 跳转到确认订单
     * @param {object} e - 事件
     **/ 
    toOrderDetail: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?id=' + id 
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