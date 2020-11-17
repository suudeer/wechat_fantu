var util = require('../../utils/util.js');
Page({
  data: {
  talks: [],
  touchStart: 0,
  inputValue: '',
  inputBiaoqing: '',
  faces: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg'],
  names: ['贝贝', '晶晶', '欢欢', '妮妮'],
  isShow: false, //控制emoji表情是否显示 
  isLoad: false, //解决初试加载时emoji动画执行一次
  cfBg: false,
  },
  
  onLoad: function() {
  var em = {},
   that = this,
   emChar = that.data.emojiChar.split("-");
  var emojis = []
  that.data.emoji.forEach(function(v, i) {
   em = {
   char: emChar[i],
   emoji: "0x1f" + v
   };
   emojis.push(em)
  });
  that.setData({
   emojis: emojis
  })
  },
  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function() {
  console.log('womenlai')
  this.setData({
   isShow: false,
   cfBg: false
  })
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
   talks: [],
   talksAnimationData: this.animation.export()
  })
  },
  
  // 加载数据
  loadTalks: function() {
  // 随机产生一些评论
  wx.showNavigationBarLoading();
  let that = this;
  let talks = [];
  let faces = ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg',



];
  let names = ['佳佳', '晶晶', '欢欢', '妮妮'];
  let contents = ['为什么这么好吃呢?', '好吃', '不好吃', '就这?'];
  let talktime = '刚刚';
  console.log(talktime)
  talks = talks.concat(that.data.talks);
  
  // 随机产生10条评论
  for (var i = 0; i < 4; i++) {
   talks.push({
   avatarUrl: faces[i],
   nickName: names[i],
   content: contents[i],
   talkTime: talktime
   });
  }
  this.setData({
   talks: talks,
   talksAnimationData: that.animation.export()
  })
  wx.hideNavigationBarLoading();
  },
  
  onScrollLoad: function() {
  // 加载新的数据
  this.loadTalks();
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
   avatarUrl: this.data.faces[Math.floor(Math.random() * this.data.faces.length)],
   nickName: this.data.names[Math.floor(Math.random() * this.data.names.length)],
   content: this.data.inputValue,
   talkTime: time
  })
  that.data.inputValue = '';
  that.setData({
   talks: that.data.talks,
   inputValue: that.data.inputValue,
   talksAnimationData: that.animation.export()
  })
  
  }
 })