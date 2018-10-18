function WaterFall(){}
$.extend(WaterFall.prototype,{
    init:function(){

        this.page = 1;

        this.main = $("#waterfall .box");
 
        this.loading = false;

        this.loadJson()
        .done(function(res){
            this.json = res.subjects;
            this.renderPage(res);
        })

        this.bindEvent();
        this.listSum();
    },
    loadJson:function(){
        var opt = {
            url:"http://www.wookmark.com/api/json/popular",
            dataType:"jsonp",
            data:{page:this.page},
           
            context:this
        }
        return $.ajax(opt);
    },
    renderPage:function(json){
     
        var html = "";
        for(var i = 0 ; i < json.length ; i ++){
            html += `  <div class="box">
                            <a href="http://localhost:8080/magnifier.html"><img src="${json[i].image}" alt=""></a>
                            
                            <div class="tab-p">
                                <span class="span1">大众 途观 2012款 1.8TSI 自动四驱风尚版</span>
                                <span class="span2">2012年 | 3.8万公里</span>
                                <div>
                                    <span class="span3">12.42万</span>
                                    <span class="span4">27.20万</span>
                                    <button class="span5" data-id=${json[i].id}>加入购物车</button>
                                </div>
                            </div>
                       </div>
                    `
        }
        this.main.html(this.main.html() + html);
      
    },
  
    bindEvent(){
        $(window).on("scroll",this.ifLoad.bind(this));
        $("#waterfall .box").on("click","button",this.addCar.bind(this));

                $(".gwc>div").on("mouseenter",this.showList.bind(this));
                $(".gwc>div").on("mouseleave",function(){
                    $(".goods-list").children().remove();
                });
                $(".gwc>div").on("click",function(event){
                    var target = event.target ; 
                    if(target != $(".gwc>div")[0]) return 0;

                    $.removeCookie("gwc");
                    // 执行鼠标移出事件;
                    $(".gwc>div").triggerHandler("mouseleave");
                    this.listSum();
                }.bind(this));
            },
            addCar:function(event){
                // 我怎么知道把谁加入到购物车之中那?;
                var target = event.target ;
                var goodsId = $(target).attr("data-id");
                
                var cookie;
                if((cookie = $.cookie("gwc"))){
                    // 将字符串转换为数组, 方便插入操作;
                    // console.log(cookie);
                    var cookieArray = JSON.parse(cookie);
                    // 判定当前要添加的商品 是否已经存在在购物车里;
                    // 表示是否存在商品;
                    var hasGoods = false;
                    for(var i = 0 ; i < cookieArray.length ; i ++){
                        if(cookieArray[i].id == goodsId ) {
                            // 存在 商品;
                            hasGoods = true;
                            cookieArray[i].num ++;
                            break;
                        }
                    }
                    // 如果没有商品;
                    if(hasGoods == false){
                        var goods = {
                            id : goodsId,
                            num : "1"
                        }
                        cookieArray.push(goods);
                    }

                    // 将数组 转为字符串 方便 储存cookie;

                    // console.log(JSON.stringify(cookieArray));
                    $.cookie("gwc",JSON.stringify(cookieArray));
                }else{
                    $.cookie("gwc",`[{"id":"${goodsId}","num":"1"}]`);
                }
                console.log($.cookie("gwc"));
                this.listSum();
            }
            ,
            showList:function(event){
                // 判定是否存在购物车,如果不存在购物车就没必要拼接列表了;
                var target = event.target;

                if(target != $(".gwc>div")[0]) return 0;

                var cookie;
                if(!(cookie = $.cookie("gwc"))){ return 0; };
                var cookieArray = JSON.parse(cookie);

                var html = "";
                // for 购物车里有多少商品就拼接多少个;
                for(var i = 0 ; i < cookieArray.length ; i ++){
                    // console.log(cookieArray[i]);
                    // for 判断哪一个商品是购物车里的商品;
                    for(var j = 0 ; j < this.json.length ; j ++){
                        if(cookieArray[i].id == this.json[j].id){
                            html += `<li data-id="${cookieArray[i].id}">
                                        <img src="${this.json[j].images.small}" alt="">
                                        <h3>${this.json[j].title}</h3>
                                        <strong>${cookieArray[i].num}</strong>
                                    </li>`;
                            break;
                        }
                    }
                }
                
                $(".goods-list").html(html);
            },
            listSum:function(){
                var cookie;
                if(!(cookie = $.cookie("gwc"))){ 
                    $(".gwc").find("span").html(0);
                    return 0;
                };
                var cookieArray = JSON.parse(cookie);
                var sum = 0;
                for(var i = 0 ; i < cookieArray.length ; i ++){
                    sum += Number(cookieArray[i].num);
                }
                $(".gwc").find("span").html(sum);
            },
    ifLoad(){
       
        var scrollTop = $("html,body").scrollTop();
        var clientHeight = $("html")[0].clientHeight;
        var lastBox = this.main.children(":last");
       
        if(scrollTop + clientHeight > lastBox.offset().top){
            
            if(this.loading){
                return 0;
            }
            this.loading = true;
          
            this.page ++;
            this.loadJson()
            .done(function(res){
              
                this.renderPage(res);
            })
        }
    }
})

var waterfall = new WaterFall();
waterfall.init();