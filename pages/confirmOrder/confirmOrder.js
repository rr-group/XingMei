var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},//地址
        carts: [],            // 修改标识为false，显示购物车为空页面
        totalPrice: 0,           // 总价，初始为0
        selectAllStatus: true,   // 全选状态，默认全选
        selectarr: []//选中数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
        var that = this;
        //获取订单缓存
        var order = wx.getStorageSync('order');
        console.log('order',order);
        
        if (!order) {
            wx.navigateTo({
                url: '../../pages/home/home'
            });
        }

        //取默认地址
        if (!order.address) {
            util.requestApi({
                url: 'user/address/default',
                success: res => {
                    that.setData({
                        address: res
                    });
                    order.address = res;
                    wx.setStorageSync('order', order);
                }
            });
        }
        if (options.address) {
            that.setData({
                address:JSON.parse(options.address)
            })  
        }
        //获取产品
        util.requestApi({
            url: 'product/' + order.productId,
            success: res => {
                res.count = order.count || 1;
                res.selected = true;
                res.desc = res.id === 1 ? '[dza]第二肌面膜旗舰店6盒装\n肌肤的有机食品' : '[dza]第二肌面膜旗舰店1片装\n肌肤的有机食品';
                var carts = [res];
                that.setData({
                    carts: carts
                });
                that.getTotalPrice();
            }
        });


    },
    /**
     * 选择地址
     * */
    tapAddress() {
        wx.setStorageSync('address-choose', true);
        wx.navigateTo({
            url: '../../pages/addressList/addressList'
        });
    },
    /**
     * 提交订单
     * */
    tapOrder() {
        var that = this;
        var order = wx.getStorageSync('order');
        util.requestApi({
            url: 'trade/order',
            type: 'post',
            data: {
                productId: order.productId,
                count: order.count,
                receiverName: order.address.name,
                receiverMobile: order.address.mobile,
                receiverProvince: order.address.province,
                receiverArea: order.address.area,
                receiverAddress: order.address.address
            },
            success: order => {
                console.log(order, that.data.totalPrice);
                //总金额为0，则跳转到已支付订单列表
                if (that.data.totalPrice == 0) {
                    wx.navigateTo({
                        url: '../../pages/order/order?id=2'
                    });
                } else {
                    //支付

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
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    /**
     * 计算总价
     */
    getTotalPrice() {
        let carts = this.data.carts;                  // 获取购物车列表
        let total = 0;
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
            if (carts[i].selected) {                     // 判断选中才会计算价格
                total += carts[i].count * carts[i].price;   // 所有价格加起来
            }
        }
        this.setData({
            totalPrice: total.toFixed(2)
        });
    },
    /**
    * 当前商品选中事件
    */
    selectList() {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        const selected = carts[index].selected;
        carts[index].selected = !selected;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    /**
    * 购物车全选事件
    */
    selectAll() {
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