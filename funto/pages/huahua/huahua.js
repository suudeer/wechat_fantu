var util = require('../../utils/util.js');
Page({
  data: {
  talks: [
    {
      avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg',
      nickName: '小红',
      content:'为什么这么好吃呢?',
      talkTime: '5分钟前'
    },
    {
      avatarUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3510986481,3852924315&fm=111&gp=0.jpg',
      nickName: '小天',
      content:'为什么好吃呢?',
      talkTime: '10分钟前'
    },
    {
      avatarUrl: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1419628337,1603242413&fm=26&gp=0.jpg',
      nickName: '小花',
      content:'就这',
      talkTime: '11分钟前'
    },
    {
      avatarUrl: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3782128483,794367969&fm=26&gp=0.jpg',
      nickName: '小皮',
      content:'好',
      talkTime: '15分钟前'
    },
  ],
 
  },
  
  onLoad: function() {
  },
  onReady: function() {
  // 评论弹出层动画创建
  this.animation = wx.createAnimation({
   duration: 400, // 整个动画过程花费的时间，单位为毫秒
   timingFunction: "ease", // 动画的类型
   delay: 0 // 动画延迟参数
  })
  },
  showTalks: function() {
  // 加载数据
  this.loadTalks();
  // 设置动画内容为：使用绝对定位显示区域，高度变为100%
  this.animation.bottom("0rpx").height("100%").step()
  this.setData({
   talksAnimationData: this.animation.export()
  })
  },
  
  hideTalks: function() {
  // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
  this.animation.bottom("-100%").height("0rpx").step()
  this.setData({
   talksAnimationData: this.animation.export()
  })
  },
  
  // 加载数据
  loadTalks: function() {
  wx.showNavigationBarLoading();
  let that = this;
  this.setData({
   talksAnimationData: that.animation.export()
  })
  wx.hideNavigationBarLoading();
  },
  
  onScrollLoad: function() {
  // 加载新的数据
 // this.loadTalks();
  },
  //下拉评论框隐藏
  touchStart: function(e) {
  let touchStart = e.touches[0].clientY;
  this.setData({
   touchStart,
  })
  },
  touchMove: function(e) {
  let touchLength = e.touches[0].clientY - this.data.touchStart;
  console.log(touchLength - 100)
  if (touchLength > 100) {
   this.animation.bottom("-100%").height("0rpx").step()
   this.setData({
   talks: [],
   talksAnimationData: this.animation.export(),
   })
  }
  },
  //输入框失去焦点时触发
  bindInputBlur: function(e) {
  console.log(e)
  console.log(this.data.inputBiaoqing)
  this.data.inputValue = e.detail.value + this.data.inputBiaoqing;
  },
  //点击发布，发布评论
  faBu: function() {
  let that = this;
  var time = util.formatTime(new Date());
  this.data.talks.unshift({
   avatarUrl: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
   nickName: '饭饭',
   content: this.data.inputValue,
   talkTime: '刚刚'/*time*/
  })
  that.data.inputValue = '';
  that.setData({
   talks: that.data.talks,
   inputValue: that.data.inputValue,
   talksAnimationData: that.animation.export()
  })
  
  }
 })