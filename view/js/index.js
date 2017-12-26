$(function(){
	(function(){
		$('#wrap li').mouseover(function(){
			if(!$(this).hasClass('curr')){
				$('#wrap li').removeClass('curr');
				$(this).addClass('curr');

				// 切换背景
				$('#wrap li').each(function(index){
					if($(this).hasClass('curr')){
						//$('.bg').fadeOut(300);
						//$('.bg:eq(' + index + ')').fadeIn(500);
						$(document.body).css("backgroundImage","url('img/"+(index+1)+".jpg')");
					}
				});

				$('.curr').stop().animate({
					width: 900
				}, 500, 'linear');
				$('#wrap li').not('.curr').stop().animate({
					width: 100
				}, 500, 'linear');
			}
		});
	})()
	
	   
    function getLocalTime(nS) {     
       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
    }     
   // alert(getLocalTime(1177824835));     
		
	//<a href="detail.html?artileID=${item.articleID}">	
	
	$.ajax({
			type:"get",
			url:"http://localhost:3000/articles/articleList",
			success:function(data){
			  var data = JSON.parse(data);
			  var str = "";
			  for(var i = 0;i < data.length;i ++){
			  	
				//console.log(JSON.parse(data[i].date))
			  	str += `			  	
						  	<div class="left">
								<div class="left11">
									<a href="detail.html?artileID=${data[i].articleID}"><h3>${data[i].title}</h3></a>
									
								</div>
								<div class="left12"><img src="img/1${i+1}.jpg"/></div>
							</div>
			  	          `
			  }
			  $(".con_left").html(str)
			}
		});
})
