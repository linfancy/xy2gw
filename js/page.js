$(function(){
    gwFuns.initFun();//模块加载

    setTimeout(function(){
        //图片延迟加载
        new nie.util.pageLoad({
            imgSelector:"img"
        });
    },0);

    var nieFun =['ui.tab',"util.share","nie.util.share","ui.Switch"];//nie组件
    nie.use(nieFun, function () {
//        $.Switch({btnDoms:[$("#switch-btn button")],imgDoms:[$("#switch-img a")],conDoms:[$("#switch-con span")]});
        $.Switch( {btnDoms:[$('.picSwitchBtn')],imgDoms:[$(".picList")],conDoms:[$('.tukuM li span')]});

        $.share.appendTo("#share");
        $.tab("#fTabNav1 li", "#fTabCont1 .ftxtList");
        $.tab("#fTabNav2 li", "#fTabCont2 .ftxtList");
    });
    var w=$(window);
    if($.browser.msie && $.browser.version == '6.0') {
        $(window).scroll(function(){
            var elm=$('#pcWrap'),h=elm.outerHeight(),scTop=w.scrollTop(),wH=w.height();
            if(h>=wH) return;
            em.css({position:'absolute'})
            elm.stop().animate({"top":scTop+(wH-h - 20)},time||400);
        })
    }
    document.getElementById('searchResult').onclick=function(){gwFuns.search();}//搜索
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
        var listWrap = $('#secSwitch'),
            listItem = $('#switchWrap li'),
            listData = listWrap.find('.imgdata'),
            totalImg = listData.length-1,
            timer = null,
            itemFlag = 0,
            i = 0;
        addImg(3);
        listItem.hover(function(){//滑动出详情介绍
            $(this).find('.numShow').toggleClass('numShowCurrent')
            $(this).find('.introDetail').toggleClass('introDetailCurrent')
        });
        timer = setInterval(function(){
            if(itemFlag <totalImg){
                var num2 = itemFlag+3;
                addImg(num2);
            }else{
                itemFlag = 0;
            }
        }, 5000)
        listWrap.mouseenter(function() {
            clearInterval(timer);
        })
        listWrap.mouseleave(function() {
            clearInterval(timer);
            timer = setInterval(function() {
                if(itemFlag <totalImg){
                    var num2 = itemFlag+3;
                    addImg(num2);
                }else{
                    itemFlag = 0;
                }
            }, 5000);
        })
        function addImg(num){
            for(itemFlag;itemFlag<num;itemFlag++,i++){//加载三张到data中
                    listItem.eq(i)
                    .attr('data-images',listData.eq(itemFlag).data('images'))
                    .attr('data-intro',listData.eq(itemFlag).data('intro'))
                    .attr('data-href',listData.eq(itemFlag).data('href'))
                    .attr('data-title',listData.eq(itemFlag).data('title'));
            }
            listItem.each(function(i){//加载三张在dom中，这样是为了防止切换时有空白显示
                var t = $(this),
                    imgfirst = t.find('img:first'),
                    img = $(this).attr('data-images'),
                    intro = $(this).attr('data-intro'),
                    href = $(this).attr('data-href'),
                    title = $(this).attr('data-title');
                t.find('.imgWrap').append('<img src="'+img+'" alt="'+title+'" width="230" height="250" class="flipInX"/>');
                t.find('.introBg').find('p').text(title);
                t.find('a').attr('href',href);
                t.find('.introDetail').find('h3').text(title);
                t.find('.introDetail').find('p').text(intro).append('[<a href="'+href+'?from=banner'+i+'" target="_blank">查看详情</a>]');
                setTimeout(function(){//删除前一张图片
                    imgfirst.remove();
                },2000)
            })
            i = 0;
        }
    },
    scrollPics:function(opt){//轮播组件
        var settings = {
                currentTarget: '',
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
            left = $currentTarget.find("#prev"),
            right = $currentTarget.find("#next"),
            tab = $(settings.tab),
            timer = null,
            currentIndex = 0;
        //tab.eq(currentIndex).addClass('current');
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
            var num = $(this).index()-1;
            $('.entryItem').addClass('hide').eq(num).removeClass('hide');
            $('.entryWrap').addClass('entryWrapShow');

        })
    },
    openD: function(opt){ //弹层函数，按需加载对应即可
        var settings = {
                id: '',
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
    FightTeam:function(){//冠军队伍
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
    initFun:function(){
        gwFuns.lunboInit();//版头轮播
        gwFuns.switchSmart();//广告轮播
        gwFuns.entryDetail();//快速入口
        gwFuns.FightTeam();//冠军队伍
        gwFuns.scrollPics({//图片切换
            currentTarget:'#slideShow',
            wrap: '#slideWrap',
            tab: ''
        });

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

