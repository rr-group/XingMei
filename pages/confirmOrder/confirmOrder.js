var config = require("../../utils/config.js");
var util = require("../../utils/util.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        carts: [],
        hasList: false,             // 修改标识为false，显示购物车为空页面
        totalPrice: 0,           // 总价，初始为0
        selectAllStatus: true,   // 全选状态，默认全选
        selectarr: []//选中数组
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        //获取订单缓存
        var order = wx.getStorageSync('order');
        //取默认地址
        if (!order.addressId) {

        } else { //去选择地址

        }
        Promise.all(function () {

        }, function () {

            }).then(function (res) {

        });
        util.requestApi({
            url: 'product/' + pid,
            success: res => {
                console.log(res);
            }
        });
        this.setData({
            hasList: true,
            carts: [
                {
                    id: 0,
                    hometitle: "第二肌面膜旗舰店",
                    payment: "编辑",
                    img: "http://pic3.58cdn.com.cn/p2/big/n_s12397344010064307145.jpg",
                    title: "&nbsp;[dza]第二肌面膜旗舰店6盒装\n肌肤的有机食品",
                    hint: "第二肌面膜啊",
                    num: 20,
                    selected: true,
                    price: 298.00
                }
            ]
        });
        this.getTotalPrice();
    },
    /**
     * 选择地址
     * */
    tapAddress() {
        wx.navigateTo({
            url: '../../pages/addressList/addressList?choose=true'
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
                total += carts[i].num * carts[i].price;   // 所有价格加起来
            }
        }
        this.setData({                                // 最后赋值到data中渲染到页面
            carts: carts,
            totalPrice: total.toFixed(2)
        });
    },
    /**
    * 当前商品选中事件
    */
    selectList(e) {
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