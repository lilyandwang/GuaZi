window.onload = function(){
var goods = document.getElementsByClassName('goods')[0];

// 用于保存购物车商品信息
var carList = [];

// 先获取当前cookie
var cookies = document.cookie.split('; ');
for(var i=0;i<cookies.length;i++){
var arr = cookies[i].split('=');
if(arr[0] === 'carlist'){
carList = JSON.parse(arr[1]);
}
}

// 事件委托
goods.onclick = function(e){
e = e || window.event;
var target = e.target || e.srcElement;

// 添加到购物车
if(target.tagName.toLowerCase() === 'button'){

// 获取当前li
var currentLi = target.parentElement.parentElement.parentElement;
var children = currentLi.children;
var currentGUID = currentLi.getAttribute('data-guid');

// 先创建一个对象保存当前商品信息
var goodsObj = {};
goodsObj.guid =currentGUID;
goodsObj.qty = Number(1);
goodsObj.imgUrl =children[0].children[0].src;
goodsObj.name = children[1].children[0].innerHTML;
goodsObj.price = Number(children[1].children[2].children[0].innerHTML);
// console.log(goodsObj.guid,goodsObj.qty,goodsObj.imgUrl,goodsObj.name,goodsObj.price)

// 如果cookie为空，则直接添加
if(carList.length===0){
// 添加到carList
carList.push(goodsObj);
}else{
// 先判断cookie中有无相同的guid商品
for(var i=0;i<carList.length;i++){
// 如果商品已经存在cookie中，则数量+1
if(carList[i].guid === currentGUID){
   carList[i].qty++;
break;
}
}
console.log(carList);
// 如果原cookie中没有当前商品
if(i===carList.length){
// 添加到carList
    carList.push(goodsObj);
}

}	
// 存入cookie
// 把对象/数组转换诚json字符串：JSON.stringify()
document.cookie = 'carlist=' + JSON.stringify(carList);
}

}
}
