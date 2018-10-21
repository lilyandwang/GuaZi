function WaterFall(){}
$.extend(WaterFall.prototype,{
    init:function(){
        // 页数;
        this.page = 1;
        // 结构外包围;
        this.main = $("#waterfall");
        // 是否在加载中;
        this.loading = false;
        this.loadJson()
        .done(function(res){
            this.renderPage(res);
        })
        this.listSum();
        this.bindEvent();
    },
    loadJson:function(){
        var opt = {
            url:"http://www.wookmark.com/api/json/popular",
            type:"GET",
            dataType:"jsonp",
            data:{page:this.page},
            context:this
        }
        return $.ajax(opt);
    },
    renderPage:function(json){
        // console.log(json);
        var html = "";
        for(var i = 0 ; i < json.length ; i ++){
            html += `  <li class="box">
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
                       </li>
                    `
        }
        // this.main.html(this.main.html() + html1);
        this.main.html(html);
    },
    bindEvent:function(){
        $(".container ul").on("click","button",this.addCar.bind(this));
        $(".shopCar>div").on("mouseenter",this.showList.bind(this));
        $(".shopCar>div").on("mouseleave",function(){
            $(".goods-list").children().remove();
        });
        $(".shopCar>div").on("click",function(event){
            var target = event.target ; 
            if(target != $(".shopCar>div")[0]) return 0;

            $.removeCookie("shopCar");
            // 执行鼠标移出事件;
            $(".shopCar>div").triggerHandler("mouseleave");
            this.listSum();
        }.bind(this));
        $(window).on("scroll",this.ifLoad.bind(this));
    },
    addCar:function(event){
        // 我怎么知道把谁加入到购物车之中那?;
        var target = event.target ;
        var goodsId = $(target).attr("data-id");
        var cookie;
        if((cookie = $.cookie("shopCar"))){
            
            var cookieArray = JSON.parse(cookie);
            
            var hasGoods = false;
            for(var i = 0 ; i < cookieArray.length ; i ++){
                if(cookieArray[i].id == goodsId ) {
                    
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
            $.cookie("shopCar",JSON.stringify(cookieArray));
        }else{
            $.cookie("shopCar",`[{"id":"${goodsId}","num":"1"}]`);
        }
        console.log($.cookie("shopCar"));
        this.listSum();
    },
    showList:function(event){
        // 判定是否存在购物车,如果不存在购物车就没必要拼接列表了;
        var target = event.target;

        if(target != $(".shopCar>div")[0]) return 0;

        var cookie;
        if(!(cookie = $.cookie("shopCar"))){ return 0; };
        var cookieArray = JSON.parse(cookie);

        var html = "";
        // for 购物车里有多少商品就拼接多少个;
        for(var i = 0 ; i < cookieArray.length ; i ++){
   
            for(var j = 0 ; j < json.length ; j ++){
                if(cookieArray[i].id == json[j].id){
                    html += `<li data-id="${cookieArray[i].id}">
                                <img src="${json[j].image}" alt="">
                                <h3>${json[j].title}</h3>
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
        if(!(cookie = $.cookie("shopCar"))){ 
            $(".shopCar").find("span").html(0);
            return 0;
        };
        var cookieArray = JSON.parse(cookie);
        var sum = 0;
        for(var i = 0 ; i < cookieArray.length ; i ++){
            sum += Number(cookieArray[i].num);
        }
        $(".shopCar").find("span").html(sum);
    },
   
    ifLoad(){
      
        var scrollTop = $("html,body").scrollTop();
        var clientHeight = $("html")[0].clientHeight;
        var lastBox = this.main.children(":last");
        // console.log(scrollTop,clientHeight,lastBox.offset());
        if(scrollTop + clientHeight > lastBox.offset().top){
            // 加载数据;
            if(this.loading){
                return 0;
            }
            this.loading = true;
            // console.log("加载");
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