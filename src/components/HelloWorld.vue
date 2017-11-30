<template>
<div class="cardInfo">
<aui-scroller lock-x scrollbar-y height="550px" ref="scroller">
<div class="box2">
   <aui-group>
      <aui-cell title="姓名">余昌蓉</aui-cell>
   </aui-group>
   <aui-panel :list="list" :type="type">
    <aui-group v-for="(item,index) in list" :key="item.index" :slot="index" class="cardfz"><aui-input title="卡号" type="number" placeholder="请输入持卡人银行卡号"></aui-input></aui-group>
   </aui-panel>   
   <aui-group class="card-sub">     
     <aui-badge text="招商银行"></aui-badge>
     <div class="add-pic-icon"></div>
     <div class="add-pic" @click="takePhoto">请点击添加照片</div>
   </aui-group>
   <aui-group class="card-sub">     
     <aui-badge text="浦发银行"></aui-badge>
     <div class="add-pic-icon"></div>
     <div class="add-pic" onclick="takePhoto1">请点击添加照片</div>
   </aui-group>
   <p class="attention">注意:拍照时尽量保持快捷键的课件靠靠靠靠口大开打开看看就看见了空间空间的空间。</p>
   <aui-button>上传</aui-button>

   
      
            
      </div>
    </aui-scroller>
</div>
</template>
<script>
import wx from 'weixin-js-sdk'

export default {
  name: 'HelloWorld',
  data () {
    return {
      type: '5',
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '招商银行<span class="card-style">存储卡</span>'        
      }, {
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '浦发银行<span class="card-style">存储卡</span>'        
      }]
    }
  },
  created(){
    wx.config({

    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。

    appId: 'wx7e192cd45db6915d', // 必填，公众号的唯一标识

    timestamp: 1512005728, // 必填，生成签名的时间戳

    nonceStr: 'sMKggAUxmT53BB2b', // 必填，生成签名的随机串

    signature: '44ae1550bee6df333b75432d450f828b3ce684c2',// 必填，签名，见附录1

    jsApiList: [          
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
          
    ]

});




wx.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
  },
  methods:{
    takePhoto:function () {
      wx.ready(function(){
        console.log("认证成功")   

      wx.chooseImage({
        count: 1, // 默认9，这里每次只处理一张照片
        sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            images.localId = res.localIds;      // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
             
            var i = 0, length = images.localId.length; 
            function upload() { 
                wx.uploadImage({ 
                    localId: images.localId[i], 
                    success: function(res) { 
                        i++; 
                        alert('已上传：' + i + '/' + length); 
                        images.serverId.push(res.serverId);
                         
                        // res.serverId 就是 media_id，根据它去微信服务器读取图片数据：
                        var indata = {"media_id":res.serverId};
                        $.post("/weixin/getPhoto.json", indata, function(data){
                            if(data.rs == 'f'){
                                alert("系统错误");
                            }else{
                                alert(data.body);   // 返回 图片在我们自己的服务器的url
                            }
                          },'json');
                         
                        if (i < length) { 
                            upload(); 
                        } 
                    }, 
                    fail: function(res) { 
                        alert(JSON.stringify(res)); 
                    }

                }); 
            } 
            upload(); 
        } 
    })
  })
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.cardInfo .attention{
  width:90%;
  margin:10px auto;
  color:#0041FF;
  font-size:12px;
}
.cardInfo .aui-badge{
  margin-left:10px;
  color:black;
  background-color:white;
  border:1px solid gray;
}
.cardInfo .add-pic-icon{
  width:40%;
  height:60px;
  background:gray;

  margin:0 auto;
  margin-top:10px;
}
.cardInfo .add-pic{
  width:100%;
  text-align:center;
  margin-top:10px;
  font-size:14px;
}
.cardInfo .weui-media-box {
    background-color: #E2ECEC;
    margin-bottom: 10px;
}
.cardInfo .card-sub{
  margin:0 auto;
  width:80%;
  height:150px;
  border:2px dotted #ccc;
  margin-bottom:10px;
}
.cardInfo .aui-no-group-title{
  margin-top:0px;
}
.cardInfo .m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.cardInfo .m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.cardInfo .m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
<style >

.cardInfo .aui-cell__ft{
  flex:1;
  text-align:left;
}
.cardInfo .aui-cells:before{
  border-top:none;
}
.cardInfo .aui-cells:after{
  border-bottom:none;
}
.cardInfo .weui-media-box_text .weui-media-box__title{
  margin-bottom:-20px;
  margin-top:15px;
}
.cardInfo .weui-cell__hd{
  margin-left:-15px;
}
.cardInfo .cardfz .aui-cells{
  font-size:13px;
}
.cardInfo .card-style{
  font-size:12px;
  margin-left:10px;
  color:#ccc
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
