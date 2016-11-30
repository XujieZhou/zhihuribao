// pages/show/show.js
Page({
  data:{
  	title:""
  },
  onLoad:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
    	title:e.title,
    	id:e.id 
    })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.setNavigationBarTitle({
      title:self.data.title,
    });
    wx.showToast({
      title:"加载中...",
      icon:"loading",
      duration:3000
    });
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/'+this.data.id,
      success: function(r){
        wx.hideToast();
        self.setData({
          content:r.data.body.replace(/<[^>]*>/g,"").replace(/&|[a-zA-Z]*/g,"")
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.request({
         url: 'http://news-at.zhihu.com/api/4/story-extra/'+this.data.id,
      success: function(res){
        
        // success
        self.setData({
          zan:res.data.popularity,
          ping:res.data.comments
      })
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