function getAni(type){
  var ani=wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease', 
  });
  if(type==='slidein'){
    ani.translate3d(-400,0,0).step();
  }else if(type==='slideout'){
     ani.translate3d(0,0,0).step();
  }
  return ani.export();
}
module.exports.getAni=getAni;