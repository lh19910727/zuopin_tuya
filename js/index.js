window.onload = function() {
	//选择线条的粗细；
	var strokes = $('#strokes');
	var spans=strokes.get(0).getElementsByTagName('span')
	var nthin=0;
	var arrnthin=[8,18,28];
	for(var i=0;i<spans.length;i++){
		spans[i].index=i;
		spans[i].ontouchstart=function(){
//	spans[i].onclick=function(){
			for(var i=0;i<spans.length;i++){
				spans[i].className='';
			}
			this.className='active';
			nthin=this.index;
		}
	}
	//选择颜色；
	var color=$('#color');
	var aspan=color.get(0).getElementsByTagName('span');
	var ncolor=0;
	var arrcolors=['white','#fb9701','#21a8e7','#22ffcc','#2ecc71','#222222'];
	for(var i=0;i<aspan.length;i++){
		aspan[i].index=i;
		aspan[i].ontouchstart=function(){
//	aspan[i].onclick=function(){
			for(var i=0;i<aspan.length;i++){
				aspan[i].className='';
			}
			this.className='checked';
			ncolor=this.index;
		}
	}
	//------------------涂鸦--------------
	var drawPic=$('#drawPic').get(0);
	var clientWidth=document.documentElement.clientWidth;
	clientWidth=clientWidth>540? 540:clientWidth;
	var canvasWidth=Math.floor(clientWidth*85/100);
	
	console.log(canvasWidth)
	//设置画布的宽高
	drawPic.width=canvasWidth;
	drawPic.height=canvasWidth;
	//开始涂鸦
	var context=drawPic.getContext('2d');
	var arr=[];
	//手指按下
//	drawPic.onmousedown=function(ev){
	drawPic.ontouchstart=function(ev){
//		var t = document.body.scrollTop||document.documentElement.scrollTop;
		//存储初始位置
		var Left=ev.touches[0].clientX-drawPic.getBoundingClientRect().left;
		var Top=ev.touches[0].clientY-drawPic.getBoundingClientRect().top;
//		var Left=ev.clientX-drawPic.getBoundingClientRect().left;
//		var Top=ev.clientY-drawPic.getBoundingClientRect().top;
		//设置线条末端的形状为圆头；
		context.lineCap='round';
		//设置线条的颜色；
		context.strokeStyle=arrcolors[ncolor];
		//设置线条的粗细；
		context.lineWidth=arrnthin[nthin];
		//开始绘制新路径
		context.beginPath();
		context.moveTo(Left,Top);
		//手指移动
//		drawPic.onmousemove=function(ev){
		drawPic.ontouchmove=function(ev){
			var L=ev.touches[0].clientX-drawPic.getBoundingClientRect().left;
			var T=ev.touches[0].clientY-drawPic.getBoundingClientRect().top;
//			var L=ev.clientX-drawPic.getBoundingClientRect().left;
//			var T=ev.clientY-drawPic.getBoundingClientRect().top;
			context.lineTo(L,T);
			context.stroke();
			ev.preventDefault();

		}
		//手指抬起
//		document.onmouseup=function(){
		document.ontouchend=function(){
			context.closePath();
//			drawPic.onmousemove=document.onmouseup=null;
			drawPic.ontouchmove=document.ontouchend=null;
			var imgData=context.getImageData(0,0,canvasWidth,canvasWidth);
			arr.push(imgData);
		}
	}
	//点击撤销
	var revoke=$('#revoke').get(0);
//	revoke.addEventListener('click',function(){
	revoke.addEventListener('touchstart',function(){
//		console.log(arr.length)
		if(arr.length===0){
			return;
		}else if(arr.length===1){
			context.clearRect(0,0,canvasWidth,canvasWidth);
			arr.pop();
		}else{
			context.clearRect(0,0,canvasWidth,canvasWidth)
			context.putImageData(arr[arr.length-2],0,0);
			arr.pop();
		}
//		console.log(arr.length)
	})
	//清除画布
	var cancle=$('#cancle');
//	cancle.on('click',function(){
	cancle.on('touchstart',function(){
		if(arr.length===0) return;
		context.clearRect(0,0,canvasWidth,canvasWidth);
		arr=[];
	});
	var submit=$('#submit');
	//存储图像数据
	var data=getsessionStorage('urldata');
	if(data){
		var arrUrl=data;
	}else{
		var arrUrl=[];
	}
	//提交数据
	submit.on('touchstart',function(){
		var left=(clientWidth-$('#list').width())/2;
		console.log(clientWidth);
		console.log($('#list').width())
		var urlData=drawPic.toDataURL();
		arrUrl.push(urlData);
		setsessionStorage('urldata', arrUrl);
		if(arrUrl.length===0)return;
//		window.location.href='imgList.html';
		$('#list').animate({'left':"50%"},500);
		$('#content').animate({'left':-1000},500);
	})
	//生成列表
	var str = '';
	var list = document.getElementById('list');
	var imgUrl = getsessionStorage('urldata');
	for(var i = 0; i < imgUrl.length; i++) {
		str += '<li>'
		str += '<img src="' + imgUrl[i] + '" alt=""/>'
		str += '</li>'
	}
	list.innerHTML = str;
}