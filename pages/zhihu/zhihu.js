// pages/zhihu/zhihu.js
var untils=require('../../untils/news.js');
var $=require("../../untils/animation.js");
var date=new Date();
var flag=true;

Page({
  data:{
    tops:[],
    news:[],
    them:'',
    acti:false,
    fade:{},
    ani:{},
  },

  //  闪屏页消失
  setFade:function(){
    var fadeout=wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
          delay: 2000
        });
      fadeout.opacity(0).scale(0,0).step();
      this.setData({
            fade:fadeout.export()
          })
    },
  //左列表
  tapbutton:function(){
    if(!this.data.acti){
      this.setData({
        ani:$.getAni('slideout'),
        acti:true
      })
    }else{
      this.setData({
        ani:$.getAni('slidein'),
        acti:false
      })
    }
  },

  active : function (e){
  	var id=e.currentTarget.dataset.id;
  	var title=e.currentTarget.dataset.title;
		wx.showActionSheet({
			itemList:["分享","阅读"],
			success:function(e){
				if(e.tapIndex===0){
					wx.showModal({
						title:'确定分享？',
						content:'........',
						success: function(res) {
					    if (res.confirm) {
					      console.log('用户点击确定')
					    }
					  }
					})
				}else if(e.tapIndex===1){
					wx.navigateTo({
					  url: '/pages/show/show?id='+id+'&title='+title,
					})
				}
			}
		})
	},
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
	onReachBottom:function(){
    //页面拉倒底部
    wx.showToast({
      title:'努力加载中',
      icon:'loading',
      duration:5000,
    })

		var s=untils.formatDate(date);
    var url='http://news.at.zhihu.com/api/4/news/before/'+s;
    var self=this;
    if (flag){
    	flag = false;
    	wx.request({
	      url: url,
	      success: function(r){
	      	wx.hideToast();
	      	flag = false;
	        // success
	         date=untils.before(date);
		       var n=self.data.news.concat(r.data.stories);
		       self.setData({
		       	news:untils.formatarr(n)
		       })
	      },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
          flag = true;
        }
    	})
    }  
	},
  onReady:function(){
    // 页面渲染完成
    
    //闪屏页
    var self=this;
    wx.request({
      url:'http://news-at.zhihu.com/api/4/start-image/1080*1776',
      success:function(r){
        self.setData({
          startImage:untils.format(r.data.img)
        });
      }
    })

    wx.showToast({
      title:'努力加载中',
      icon:'loading',
      duration:5000,
      success:function(){

      },
      fail:function(){

      },
      complete:function(){

      }
    })

    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/themes',
      success: function(r){
          self.setData({
               them:r.data.others
          })
         
      }
    });
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        wx.hideToast();
        // success
        var t=r.data.top_stories;
        var n=r.data.stories;
        self.setData({
          tops:untils.formatarr(t),
          news:untils.formatarr(n)
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})