var str='';
var list=document.getElementById('list');
var imgUrl=getsessionStorage('urldata');
console.log(imgUrl);
for(var i=0;i<imgUrl.length;i++){
	str+='<li>'
	str+='<img src="'+imgUrl[i]+'" alt=""/>'
	str+='</li>'
}
list.innerHTML=str;