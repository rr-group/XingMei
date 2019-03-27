var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
var _ = require("../../utils/underscore.js");

//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        signNum: 0,
        isCheckIn: false, //签到状态
        min: 1, //默认值日期第一天1
        nullHouse: true, //先设置隐藏
        tabbar: {},
        bannerList: [{
            image: 'http://img2.imgtn.bdimg.com/it/u=969943602,1413306956&fm=26&gp=0.jpg',
            url: ''
        }, {
            image: 'http://img3.imgtn.bdimg.com/it/u=1490877483,2102371200&fm=26&gp=0.jpg',
            url: ''
        }, {
            image: 'http://img5.imgtn.bdimg.com/it/u=4059571990,2518088609&fm=26&gp=0.jpg',
            url: ''
        }, {
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551106428871&di=947c8abf41eb7426a47d378f70bbd368&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201507%2F03%2F20150703084403_kCiec.thumb.700_0.jpeg',
            url: ''
        }],
        indicatorDots: true,
        indicatorColor: "#cecece",
        indicatorActivecolor: "#d288c3",
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
        img_url: "http://img2.imgtn.bdimg.com/it/u=969943602,1413306956&fm=26&gp=0.jpg", //图片地址
        shareLevel: 0, //分享级别，默认无级别0,；5天/片为1，以此类推
        totalBrokerage: 0, //已获得佣金
        totalGiftCount: 0, //已获得面膜
        totalShareCount: 0, //已成功邀请
        //圆自适应
        width: 190,
        height: 190,
        r: 80,
        r1: 45,
        r2: 30
    },
    // 提现
    bindWithdraw: function () {
        wx.navigateTo({
            url: '/pages/bonus/bonus'
        });
    },
    // 发货
    bindDeliver: function () {
        wx.navigateTo({
            url: '/pages/myMask/myMask'
        });
    },
    // 邀请
    bindInvite: function () {
        wx.navigateTo({
            url: '/pages/group/group'
        });
    },
    // 画圆
    drawCircle: function (step) {
        var that = this;
        console.log(that.data.r, that.data.r, that.data.r1)
        var context = wx.createCanvasContext('canvasProgress');
        context.setLineWidth(10);
        context.setStrokeStyle("#c793ca");
        context.setLineCap('round')
        context.beginPath();
        // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
        context.arc(that.data.r, that.data.r, that.data.r1, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
        context.stroke();
        // context.draw()
        context.draw(false, () => {
            // 延迟保存图片，解决生成图片错位bug。
            setTimeout(() => {
                this.canvasToTempImage();
            }, 400);
        });

    },
    canvasToTempImage: function () {
        wx.canvasToTempFilePath({
            canvasId: 'canvasProgress',
            success: (res) => {
                let tempFilePath = res.tempFilePath;
                this.setData({
                    imagePath: tempFilePath
                });
            }
        }, this);
    },
    //签到
    bindSignIn(e) {
        var that = this;
        util.requestApi({
            url: 'user/checkin',
            data: {},
            type: 'post',
            success: res => {
                var days = util.checkinDay(that.data.shareLevel);
                var num = that.data.keepCount + 1;
                this.drawCircle(2 / days * num);
                that.setData({
                    isCheckIn: true
                });

                if (num >= days) {
                    that.setData({
                        signNum: 0
                    });
                }
            }
        });
        this.setData({
            nullHouse: false, //弹窗显示
        })
    },
    //关闭弹框
    bindclones() {
        this.setData({
            nullHouse: true //弹窗隐藏
        });
    },
    //事件处理函数
    bindViewTap: function () {

    },
    //生命周期函数--监听页面加载
    onLoad: function (options) {
        var that = this;
        app.editTabbar();
        console.log('分享用户：' + options.uid);
        wx.showLoading({
            title: '加载中' + options.uid
        });
        wx.getSystemInfo({
            //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
            success: function (res) {
                var widths = res.windowWidth;
                var heights = res.windowHeight;
                that.setData({
                    width: 190 / 375 * widths,
                    height: 190 / 375 * heights,
                    r: 45 / 375 * widths,
                    r1: 38 / 375 * widths,
                    r2: 30 / 375 * widths
                });
            }
        });

        var itv = setInterval(function () {
            if (app.globalData.appUser) {
                wx.hideLoading();
                clearInterval(itv);

                //获取banner列表
                util.requestApi({
                    url: 'site/adimage/1',
                    success: res => {
                        _.each(res, function (item) {
                            item.image = config.imgHost + item.image;
                        });
                        that.setData({
                            bannerList: res
                        });
                    }
                });

                //绑定分享用户
                var uid = options.uid;
                if (uid) {
                    util.requestApi({
                        url:'user/recommend',
                        type:'put',
                        data:{
                            userId:uid
                        },
                        success:res=>{
                            console.log(res);
                        }
                    });
                }

                //是否已签到
                util.requestApi({
                    url: 'user/checkin',
                    success: res => {
                        that.setData({
                            signNum: res.keepCount,
                            isCheckIn: res.hasCheckin
                        })
                    }
                });

                //获取用户社交信息
                util.requestApi({
                    url: 'user/social',
                    success: res => {
                        that.setData({
                            totalBrokerage: res.totalBrokerage,
                            totalGiftCount: res.totalGiftCount,
                            totalShareCount: res.shareLv1Count + res.shareLv2Count,
                            shareLevel: res.shareLevel - 1
                        });
                    }
                });
            }
        });
    },
    /**
     * 跳转到详情
     */
    toProduct: function () {
        wx.navigateTo({
            url: '/pages/product/product',
        });
    },
    /**
     * 分享
     */
    onShareAppMessage: function () {
        return {
            title: '自定义分享标题',
            iamge:'http://www.baidu.com/img/bd_logo1.png?where=super',
            desc: '自定义分享描述',
            path: '/pages/home/home?uid=123'
        }
    }
})