//=======================
// 2014.3-4 建立 by 方阳
//---------------------------------------
//---相关函数介绍
//- gwFuns 大模块
//---lunboInit                        版头轮播初始化函数（调用 initLunbo 函数）
//---search                            搜索转码函数
//---switchSmart                   一屏图片广告位轮播函数
//---scrollPics                        图片幻灯片组件
//---entryDetail                     快速入口样式组件
//---openD                           弹层函数（已包含普通、flash和视频调用方法，具体可看具体参数介绍）
//---fightTeam                      冠军队伍相关介绍（冠军队伍相关数据可找平台组云云：gzchenyunyun2013@corp.netease.com）
//---calTime                          日历显示日期函数

$(function(){
    gwFuns.initFun();//模块加载

    setTimeout(function(){//图片延迟加载
        new nie.util.pageLoad({
            imgSelector:"img"
        });
    },0);

    var nieFun =['ui.tab',"util.share","nie.util.share","ui.Switch","nie.util.freshNews","util.bjTime","util.swfobject"];//nie组件
    nie.use(nieFun, function () {
        //下载专区Flash
        if($.flash.available){
            $('.secDownload').prepend('<div id="downFlash"></div>')
                                     .find('.downFlag').addClass('hide');
            $('#downFlash').empty().flash({
                swf: 'http://res.nie.netease.com/xy2/gw/14v1/swf/download.swf',
                wmode:"transparent",
                allowscriptaccess:"always",
                width: 300,
                height:280
            });
        }
        //图库
        $.Switch( {btnDoms:[$('.picSwitchBtn')],imgDoms:[$(".picList")],conDoms:[$('.tukuM li span')]});
        //分享
        $.share.appendTo("#share");
        //新闻切换
        $.tab("#fTabNav1 li", "#fTabCont1 .ftxtList");
        $.tab("#fTabNav2 li", "#fTabCont2 .ftxtList");
        //日期
        $.bjTime.getDate(gwFuns.calTime);

        //未读新闻
        var freshNews=nie.util.freshNews();
        var num = [],tab1 = $('#fTabNav1').find('li'),tab2 = $('#fTabNav2').find('li');//最新、新闻、公告、活动、专题、推荐、回顾、玩家、热帖、你提我改
        num[0] =  num[1] = num[2] = num[3] = num[4] = num[5] = num[6] = num[7] = num[8] = num[9] = 0
        for(var j = 0;j<freshNews.data.length;j++){
            switch (freshNews.data[j].channel){
                case '新闻': num[1]++;break;
                case '公告': num[2]++;break;
                case '活动': num[3]++;break;
                case '专题': num[4]++;break;
                case '图片': num[5]++;break;
                case '畅谈大话': num[5]++;break;
                case '大话画报': num[5]++;break;
                case '大剧透': num[5]++;break;
                case '牛人逸事': num[5]++;break;
                case '鸡驴大婶': num[5]++;break;
                case '热门话题': num[5]++;break;
                case '有内涵': num[5]++;break;
                case '牛图总汇': num[5]++;break;
                case '投票': num[5]++;break;
                case '??有神': num[5]++;break;
                case '推荐头图': num[5]++;break;
                case '回顾': num[6]++;break;
                case '玩家':num[7]++;break;
                case '热帖': num[8]++;break;
                case '你提我改': num[9]++;break;
                default :break;
            }
        }
        num[0] = num[1]+num[2]+num[3]+num[4];
        for(var k = 0;k<num.length;k++){
            if(num[k]){
                if(k<=4){
                    tab1.eq(k).append('<em class="sprite">'+num[k]+'</em>')
                }else{
                    tab2.eq(k-5).append('<em class="sprite">'+num[k]+'</em>')
                }
            }
        }
    });
    //右侧飘窗
    var w=$(window);
    if($.browser.msie && $.browser.version == '6.0') {
        $(window).scroll(function(){
            var elm=$('#pcWrap'),h=elm.outerHeight(),scTop=w.scrollTop(),wH=w.height();
            if(h>=wH) return;
            em.css({position:'absolute'})
            elm.stop().animate({"top":scTop+(wH-h - 20)},time||400);
        })
    }
    //搜索
    document.getElementById('searchResult').onclick=function(){gwFuns.search();}
    //周末活动
    $('.entryBlock h3').click(function(){
        $('.entryBlockWrap').fadeIn();
    })
    $('#entryClose').click(function(){
        $('.entryBlockWrap').fadeOut();
    })
})
//组件库
var gwFuns = {
    lunboInit:function(){//轮播
        var showImg = $('#bannerShowItem'),showWrap = $('#bannerShowImg');
        showWrap.find('li').eq(0).show();
        showImg.find('a').eq(0).addClass('current');
        //if ($(window).width() < 1420) {$(".lunbo_nav_t a").hide()}
        $("#bannerShow").initLunbo();
    },
    search:function(){//搜索
        var val = $("#searchKeyWords1").val();
        window.open(encodeURI("http://so.xy2.163.com/search?qs="+val));
    },
    switchSmart:function(){//轮播广告位
        var listBlock = $('#secSwitch'),
            listWrap = $('#switchWrap'),
            listData = listBlock.find('.imgdata'),
            totalImg = listData.length/ 4,
            itemFlag = 0;
            for(var i = 0;i<totalImg;i++){
                var html = '<li><div class="imgWrap">';
                for(var j = 0;j<4;j++,itemFlag++){
                    if(listData.eq(itemFlag).length !=0){
                        html +='<a href="$link" target="_blank"><img src="$src" alt="title" width="229" height="123"/><p class="bannerTitle">title</p><p class="bannerIntro">$intro</p></a>'
                            .replace('$src',listData.eq(itemFlag).data('images'))
                            .replace(/title/g,listData.eq(itemFlag).data('title'))
                            .replace('$link',listData.eq(itemFlag).data('href'))
                            .replace('$intro',listData.eq(itemFlag).data('intro'));
                    }
                }
                html+='</div></li>'
                listBlock.find('ol').append('<li><i></i></li>')
                listWrap.append(html);
            }
        var l = listBlock.find('ol').find('li');
        l.css('width', parseInt(95/ l.length)+'px');

        listBlock.hover(function(){
            $('#slideBtn3').show()
        },function(){
            $('#slideBtn3').hide()
        })
        gwFuns.scrollPics({//广告切换
            currentTarget:'#secSwitch',
            wrap: '#secSwitch',
            tab:'.secSwitch ol li'
        });
    },
    scrollPics:function(opt){//图片幻灯片组件
        var settings = {
                currentTarget: '',
                wrap:'',
                autoplay : true,
                minNum: 1,
                time: 5000,
                tab: ''
            },
            opt = opt || {};
        settings = $.extend(settings, opt);

        var $currentTarget = $(settings.currentTarget),
            $wrap = $(settings.wrap),
            ul = $wrap.find("ul"),
            li_len = ul.find("li").length,
            li_w = ul.find("li").width(),
            left = $currentTarget.find(".prev"),
            right = $currentTarget.find(".next"),
            tab = $(settings.tab),
            timer = null,
            currentIndex = 0;
        tab.eq(currentIndex).addClass('current');
        ul.css('width',li_w*li_len)
        if(li_len > settings.minNum){
            right.click(function() {
                currentIndex++;
                if(currentIndex == li_len){
                    currentIndex = 0;
                }
                tab.removeClass('current').eq(currentIndex).addClass('current');
                ul.stop().animate({
                    "left": -(li_w*currentIndex)
                }, 300)
            });
            left.click(function() {
                currentIndex--;
                if(currentIndex < 0){
                    currentIndex = li_len - 1;
                }
                tab.removeClass('current').eq(currentIndex).addClass('current');

                ul.stop().animate({
                    "left": -(li_w*currentIndex)
                }, 300)
            });
            tab.click(function(){
                currentIndex = $(this).index(settings.tab);
                tab.removeClass('current').eq(currentIndex).addClass('current');
                ul.stop().animate({
                    "left": -(li_w*currentIndex)
                }, 300)
            });
            if (settings.autoplay) {
                timer = setInterval(function() {
                    right.trigger("click");
                }, settings.time);
                $wrap.mouseenter(function() {
                    clearInterval(timer);
                })
                $wrap.mouseleave(function() {
                    clearInterval(timer);
                    timer = setInterval(function() {
                        right.trigger("click");
                    }, settings.time);
                })
            };
        }
    },
    entryDetail:function(){ //快速入口弹出
        $('.slideTopDetail').hover(function(){
            var num = $(this).index();
            $('.entryItem').addClass('hide').eq(num).removeClass('hide');
            $('.entryWrap').addClass('entryWrapShow');
            $('.slideTopDetail').removeClass('current');
            $(this).delay(100).addClass('current')
        })
        $('#closeWrap').click(function(){
            $('.slideTopDetail').removeClass('current');
            $('.entryWrap').removeClass('entryWrapShow');
        })
    },
    openD: function(opt){ //弹层函数，按需加载对应即可
        var settings = {
                id: '',//弹层的id
                type : '',//1为普通弹层，2为flash弹层，3为视频弹层
                width: '',//2和3需要使用
                height: '',//2和3需要使用
                flashurl:'',//2需要使用，flash地址
                videourl:'',//3需要使用，视频地址
                wmode: '',//2和3可能需要使用
                startImg:''//3需要使用，视频截图
            },
            opt = opt || {};
        settings = $.extend(settings, opt);

        var popbg = $("#NIE-overlayer"),
            popid = $(settings.id),
            type = settings.type,
            w =parseInt(settings.width),
            h = parseInt(settings.height),
            vimg = settings.startImg,
            furl = settings.flashurl,
            vurl = settings.videourl,
            wmode = settings.wmode,
            dh = $(document).height(),
            wh = $(window).height(),
            ww = $(window).width(),
            st = $(window).scrollTop(),
            sl = $(window).scrollLeft();
        // 蒙版弹出
        popbg.css({"height":dh}).show();
        // 弹层弹出
        function posPop(idname){
            idname.height()>wh?idname.fadeIn().css({'top':st,'left':(ww-idname.outerWidth())/2+sl}):idname.fadeIn().css({'top':(wh-idname.outerHeight())/2+st,'left':(ww-idname.outerWidth())/2+sl});
        }
        //  弹层关闭
        $('.aCloseQ').click(function(){
            $(this).parent().fadeOut();
            $("#NIE-overlayer").hide();
        });
        //判断弹层类别
        switch (type){
            case '1':
                posPop(popid);
                break;
            case '2':
                $('#flash-wrap').html('');
                nie.use(["util.swfobject"], function () {
                    $('#flash-wrap').flash({
                        swf:furl,
                        width:w,
                        height:h,
                        allowScriptAccess:'always',
                        wmode:wmode
                    });
                })
                var obj = $('#flashtc1');
                obj.css({'width':w,'height':h});
                $('.aCloseQ').hide();//flash本身有做关闭按钮
                posPop(popid);
                break;
            case '3':
                $('#dVideo').html('').css({'height':h+'px','width':w+'px'});
                popid.css({'height':h+22+'px','width':w+22+'px'});
                posPop(popid);
                nie.use(['nie.util.video'], function () {
                    nie.util.video($('#dVideo'),{
                        movieUrl:vurl,
                        mp4_movieUrl:vurl.replace(/\.(flv|f4v)/,'.mp4'),
                        width:w,
                        height:h,
                        startImg:vimg,
                        bufferTime:5,
                        loopTimes:0,
                        wmode:"opaque",
                        volume:0.8,
                        autoPlay:true
                    });
                })
                break;
            default :break;
        }
    },
    fightTeam:function(){//冠军队伍
        $.ajax({
            type:"get",
            url:"http://xy2-pk.webapp.163.com/user/get_champ_team",
            dataType : "jsonp",
            success : function(data){
                var jason_server_name,jason_max_seq,jason_user_name,jason_head_img;
                jason_max_seq = data['max_seq'];
                jason_server_name = data['champ_team'][0]['server_name'];
                $('#fightTeam').html('第<em>'+jason_max_seq+'</em>届比武大会冠军服务器：<strong>'+jason_server_name+'</strong>');
            }
        })
    },
    calTime:function(o){
        var cnday;
        var week=["一","二","三","四","五","六","日"];
        var starday
        var oneday = 86400000
        var nowdate = new Date(o.dateObj)
        var nownum
        switch(o.day){
            case 0 :cnday = '日';break;
            case 1 :cnday = '一';break;
            case 2 :cnday = '二';break;
            case 3 :cnday = '三';break;
            case 4 :cnday = '四';break;
            case 5 :cnday = '五';break;
            case 6 :cnday = '六';break;
        }
        if(o.day == 0){
            starday = new Date(nowdate.getTime()-oneday*6)
            nownum = 6
        }
        else{
            starday = new Date(nowdate.getTime()-oneday*(o.day-1))
            nownum = o.day-1
        }
        $(".calTime").each(function(i){
            var weekday = new Date(starday.getTime()+oneday*i)
            var html = "<strong>时间：</strong>"
            html +=weekday.getMonth()+1+"月"+weekday.getDate()+"日"+"　周"+week[i]
            $(this).html(html);
        })
    },
    teamShow:function(){
        $('#btnEditor').click(function(){
            var t = $(this)
            if(!(t.hasClass('hideEditor'))){
                t.addClass('hideEditor');
                $('#fotSellBlock').animate({'width':'0'},400);
                $('#teamPart')
                    .css('overflow','hidden')
                    .fadeIn()
                    .animate({'width':'702px'},100,function(){
                        $(this).css('overflow','visible');
                    })

            }else{
                t.removeClass('hideEditor');
                $('#teamPart').hide().animate({'width':'0'},100);
                $('#fotSellBlock').animate({'width':'805px'},400);
            }
        })
        $( ".teamPart").find('li').hover(function() {
            $(this).find('.teamIntro').stop().animate({'opacity':'1'},200)
        },function(){
            $(this).find('.teamIntro').stop().animate({'opacity':'0'},200)
        });
    },
    initFun:function(){
        gwFuns.lunboInit();//版头轮播
        gwFuns.switchSmart();//广告轮播
        gwFuns.entryDetail();//快速入口
        gwFuns.fightTeam();//冠军队伍
        gwFuns.scrollPics({//图片切换
            currentTarget:'#slideShow',
            wrap: '#slideWrap'
        });
        gwFuns.scrollPics({//日历切换
            currentTarget:'#slideShow2',
            wrap: '#slideWrap2',
            autoplay : false
        });
        gwFuns.teamShow()//团队介绍

    }
}
//图片延迟加载
nie.util.pageLoad=nie.util.pageLoad||function(e){$(function(){var g=$(window),f={},h={},i=window.location.hash,j=function(){var c=g.scrollTop()-50,a=c+g.height()+50,d;for(d in f){var b=f[d],e=!1;if(b.b){if(b.y>=c&&b.y<=a||b.b>=c&&b.b<=a)e=!0}else b.y>=c&&b.y<=a&&(e=!0);e&&b.dom.attr("src",b.src)}for(d in h)b=h[d],(b.top>=c&&b.top<=a||b.bot>=c&&b.bot<=a)&&b.dom.attr("style","background-image:url("+b.src+")")};e.bgSelector&&$(e.bgSelector).each(function(c){var a=$(this),d=a.attr("data-bgUrl");if(d!=
    ""){var b=a.offset().top+parseInt($.browser.msie?a.css("background-position-y"):a.css("background-position").split(" ")[1]);h[c]={dom:a,src:d,top:b,bot:b+a.height()}}});e.imgSelector&&$(e.imgSelector).each(function(c){var a=$(this),d=a.attr("data-src");if(d!="")if(f[c]={dom:a,src:d,y:a.offset().top},a.css("height"))f[c].b=f[c].y+parseInt(a.css("height"));else if(a.attr("height"))f[c].b=f[c].y+parseInt(a.attr("height"))});g.scroll(j).resize(j);(i==""||$("a#"+i+"[name="+i+"]").length==0)&&j()})};

//轮播
$.fn.initLunbo = function (options) {
    var defaults = {
        lunbo_box: "#bannerShow",
        lunbo_item: ".lunboImgItem",
        lunbo_nav_btn: "#bannerShowItem ul",
        lunbo_nav: ".lunboNav",
        lunbo_prev: "#lunboPrev",
        lunbo_next: "#lunboNext",
        time: 1000,
        time2: 6000,
        oWidth: 240,
        timer: null
    }
    var ops = $.extend(defaults, options);
    var lunbo = $(this);
    var lb_items = lunbo.find(ops.lunbo_item);
    var lb_nav = $(this).find(ops.lunbo_nav);
    var lb_nav_btn =$(this).find(ops.lunbo_nav_btn);
    var lb_nav_btns = lb_nav_btn.find("a");
    var btnsNum = lb_nav_btns.length;
    var oPrev = $(ops.lunbo_prev);
    var oNext = $(ops.lunbo_next);
    var x = 0;
    var oLeft = 0;
    var y = 0;

    function initPosition() {
        var web_width = $(window).width();
        lb_nav_btn.width(240 * lb_nav_btns.length);
        if (web_width <= 1104) {
            lunbo.css("width", "1104px");
        }
        else {
            lunbo.css("width", "100%");
        }
        //lb_nav.css("left", (web_width - 1104) / 2 + "px");
    }

    lb_nav_btns.each(function (i) {
        $(this).hover(function () {
            x = i;
            navAnimate();
            itemAnimate();
        }, function () {

        });
    });

    oPrev.click(function () {
        x = x <= 0 ? btnsNum - 1 : x - 1;
        y = x - 2;
        if (y >= 0 && y <= btnsNum - 4) {
            oLeft = y * ops.oWidth;
        }
        if (x >= 6) {
            oLeft = ((btnsNum - 4) * ops.oWidth);
        }
        if (x <= 2) {
            oLeft = 0;
        }
        navAnimate();
        itemAnimate();
    });

    oNext.click(function () {
        fnNext();
    });

    function fnNext() {
        x = x >= btnsNum - 1 ? 0 : x + 1;
        y = x - 2;
        if (y >= 0 && y <= btnsNum - 4) {
            oLeft = y * ops.oWidth;
        }
        if (x <= 0) {
            oLeft = 0;
        }
        if (x == btnsNum - 1) {
            oLeft = (btnsNum - 4) * ops.oWidth;
        }
        navAnimate();
        itemAnimate();
    }

    function navAnimate() {
        lb_nav_btn.stop().animate({ "left": -oLeft + "px" });
    }

    function itemAnimate() {
        lb_nav_btns.removeClass("current").eq(x).addClass("current");
        lb_items.stop().hide().eq(x).show().css("opacity", "0.5").animate({ "opacity": "1.0" }, ops.time);
        $("#moreBtn").attr("href", lb_items.eq(x).find("a").attr("data-href"));
    }

    initPosition();
    $("#moreBtn").attr("href", lb_items.eq(0).find("a").attr("data-href"));
    ops.timer = setInterval(fnNext, ops.time2);
    $(this).hover(function () {
        clearInterval(ops.timer);
        ops.timer = null;
    }, function () {
        ops.timer = setInterval(fnNext, ops.time2);
    });

    $(window).resize(function () { initPosition() });

};

