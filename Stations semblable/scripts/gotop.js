define(['jquery'], function($) {
   var GoTop=function(){
     function _GoTop(){
       this.createNode();
       this.bind();
     }
     _GoTop.prototype.createNode=function(){
       var tpl= '<div class="gotop">'
              +   '<a href="javascript:void(0)">回到顶部</a>'
              + '</div>';
       $('body').append($(tpl)); 
     }
     _GoTop.prototype.bind=function(){
       var $goTop=$(".gotop");
       $goTop.hide();
       $(window).on("scroll",function(){
          console.log($(window).scrollTop());
         if($(window).scrollTop()>1000){
            $goTop.show();
         }else{
            $goTop.hide();
         }
       })
       $goTop.on("click",function(){
         $(window).scrollTop(0);
       })
     }
     return {
       init:function(){
         new _GoTop();
       }
     }
   }()
   return GoTop;
});