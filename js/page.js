//=======================
// 2014.3-4 ���� by ����
//---------------------------------------
//---��غ�������
//- gwFuns ��ģ��
//---lunboInit                        ��ͷ�ֲ���ʼ������������ initLunbo ������
//---search                            ����ת�뺯��
//---switchSmart                   һ��ͼƬ���λ�ֲ�����
//---scrollPics                        ͼƬ�õ�Ƭ���
//---entryDetail                     ���������ʽ���
//---openD                           ���㺯�����Ѱ�����ͨ��flash����Ƶ���÷���������ɿ�����������ܣ�
//---fightTeam                      �ھ�������ؽ��ܣ��ھ�����������ݿ���ƽ̨�����ƣ�gzchenyunyun2013@corp.netease.com��
//---calTime                          ������ʾ���ں���

$(function(){
    gwFuns.initFun();//ģ�����

    setTimeout(function(){//ͼƬ�ӳټ���
        new nie.util.pageLoad({
            imgSelector:"img"
        });
    },0);

    var nieFun =['ui.tab',"util.share","nie.util.share","ui.Switch","nie.util.freshNews","util.bjTime","util.swfobject"];//nie���
    nie.use(nieFun, function () {
        //����ר��Flash
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
        //ͼ��
        $.Switch( {btnDoms:[$('.picSwitchBtn')],imgDoms:[$(".picList")],conDoms:[$('.tukuM li span')]});
        //����
        $.share.appendTo("#share");
        //�����л�
        $.tab("#fTabNav1 li", "#fTabCont1 .ftxtList");
        $.tab("#fTabNav2 li", "#fTabCont2 .ftxtList");
        //����
        $.bjTime.getDate(gwFuns.calTime);

        //δ������
        var freshNews=nie.util.freshNews();
        var num = [],tab1 = $('#fTabNav1').find('li'),tab2 = $('#fTabNav2').find('li');//���¡����š����桢���ר�⡢�Ƽ����عˡ���ҡ������������Ҹ�
        num[0] =  num[1] = num[2] = num[3] = num[4] = num[5] = num[6] = num[7] = num[8] = num[9] = 0
        for(var j = 0;j<freshNews.data.length;j++){
            switch (freshNews.data[j].channel){
                case '����': num[1]++;break;
                case '����': num[2]++;break;
                case '�': num[3]++;break;
                case 'ר��': num[4]++;break;
                case 'ͼƬ': num[5]++;break;
                case '��̸��': num[5]++;break;
                case '�󻰻���': num[5]++;break;
                case '���͸': num[5]++;break;
                case 'ţ������': num[5]++;break;
                case '��¿����': num[5]++;break;
                case '���Ż���': num[5]++;break;
                case '���ں�': num[5]++;break;
                case 'ţͼ�ܻ�': num[5]++;break;
                case 'ͶƱ': num[5]++;break;
                case '??����': num[5]++;break;
                case '�Ƽ�ͷͼ': num[5]++;break;
                case '�ع�': num[6]++;break;
                case '���':num[7]++;break;
                case '����': num[8]++;break;
                case '�����Ҹ�': num[9]++;break;
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
    //�Ҳ�Ʈ��
    var w=$(window);
    if($.browser.msie && $.browser.version == '6.0') {
        $(window).scroll(function(){
            var elm=$('#pcWrap'),h=elm.outerHeight(),scTop=w.scrollTop(),wH=w.height();
            if(h>=wH) return;
            em.css({position:'absolute'})
            elm.stop().animate({"top":scTop+(wH-h - 20)},time||400);
        })
    }
    //����
    document.getElementById('searchResult').onclick=function(){gwFuns.search();}
    //��ĩ�
    $('.entryBlock h3').click(function(){
        $('.entryBlockWrap').fadeIn();
    })
    $('#entryClose').click(function(){
        $('.entryBlockWrap').fadeOut();
    })
})
//�����
var gwFuns = {
    lunboInit:function(){//�ֲ�
        var showImg = $('#bannerShowItem'),showWrap = $('#bannerShowImg');
        showWrap.find('li').eq(0).show();
        showImg.find('a').eq(0).addClass('current');
        //if ($(window).width() < 1420) {$(".lunbo_nav_t a").hide()}
        $("#bannerShow").initLunbo();
    },
    search:function(){//����
        var val = $("#searchKeyWords1").val();
        window.open(encodeURI("http://so.xy2.163.com/search?qs="+val));
    },
    switchSmart:function(){//�ֲ����λ
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
        gwFuns.scrollPics({//����л�
            currentTarget:'#secSwitch',
            wrap: '#secSwitch',
            tab:'.secSwitch ol li'
        });
    },
    scrollPics:function(opt){//ͼƬ�õ�Ƭ���
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
    entryDetail:function(){ //������ڵ���
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
    openD: function(opt){ //���㺯����������ض�Ӧ����
        var settings = {
                id: '',//�����id
                type : '',//1Ϊ��ͨ���㣬2Ϊflash���㣬3Ϊ��Ƶ����
                width: '',//2��3��Ҫʹ��
                height: '',//2��3��Ҫʹ��
                flashurl:'',//2��Ҫʹ�ã�flash��ַ
                videourl:'',//3��Ҫʹ�ã���Ƶ��ַ
                wmode: '',//2��3������Ҫʹ��
                startImg:''//3��Ҫʹ�ã���Ƶ��ͼ
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
        // �ɰ浯��
        popbg.css({"height":dh}).show();
        // ���㵯��
        function posPop(idname){
            idname.height()>wh?idname.fadeIn().css({'top':st,'left':(ww-idname.outerWidth())/2+sl}):idname.fadeIn().css({'top':(wh-idname.outerHeight())/2+st,'left':(ww-idname.outerWidth())/2+sl});
        }
        //  ����ر�
        $('.aCloseQ').click(function(){
            $(this).parent().fadeOut();
            $("#NIE-overlayer").hide();
        });
        //�жϵ������
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
                $('.aCloseQ').hide();//flash���������رհ�ť
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
    fightTeam:function(){//�ھ�����
        $.ajax({
            type:"get",
            url:"http://xy2-pk.webapp.163.com/user/get_champ_team",
            dataType : "jsonp",
            success : function(data){
                var jason_server_name,jason_max_seq,jason_user_name,jason_head_img;
                jason_max_seq = data['max_seq'];
                jason_server_name = data['champ_team'][0]['server_name'];
                $('#fightTeam').html('��<em>'+jason_max_seq+'</em>�������ھ���������<strong>'+jason_server_name+'</strong>');
            }
        })
    },
    calTime:function(o){
        var cnday;
        var week=["һ","��","��","��","��","��","��"];
        var starday
        var oneday = 86400000
        var nowdate = new Date(o.dateObj)
        var nownum
        switch(o.day){
            case 0 :cnday = '��';break;
            case 1 :cnday = 'һ';break;
            case 2 :cnday = '��';break;
            case 3 :cnday = '��';break;
            case 4 :cnday = '��';break;
            case 5 :cnday = '��';break;
            case 6 :cnday = '��';break;
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
            var html = "<strong>ʱ�䣺</strong>"
            html +=weekday.getMonth()+1+"��"+weekday.getDate()+"��"+"����"+week[i]
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
        gwFuns.lunboInit();//��ͷ�ֲ�
        gwFuns.switchSmart();//����ֲ�
        gwFuns.entryDetail();//�������
        gwFuns.fightTeam();//�ھ�����
        gwFuns.scrollPics({//ͼƬ�л�
            currentTarget:'#slideShow',
            wrap: '#slideWrap'
        });
        gwFuns.scrollPics({//�����л�
            currentTarget:'#slideShow2',
            wrap: '#slideWrap2',
            autoplay : false
        });
        gwFuns.teamShow()//�Ŷӽ���

    }
}
//ͼƬ�ӳټ���
nie.util.pageLoad=nie.util.pageLoad||function(e){$(function(){var g=$(window),f={},h={},i=window.location.hash,j=function(){var c=g.scrollTop()-50,a=c+g.height()+50,d;for(d in f){var b=f[d],e=!1;if(b.b){if(b.y>=c&&b.y<=a||b.b>=c&&b.b<=a)e=!0}else b.y>=c&&b.y<=a&&(e=!0);e&&b.dom.attr("src",b.src)}for(d in h)b=h[d],(b.top>=c&&b.top<=a||b.bot>=c&&b.bot<=a)&&b.dom.attr("style","background-image:url("+b.src+")")};e.bgSelector&&$(e.bgSelector).each(function(c){var a=$(this),d=a.attr("data-bgUrl");if(d!=
    ""){var b=a.offset().top+parseInt($.browser.msie?a.css("background-position-y"):a.css("background-position").split(" ")[1]);h[c]={dom:a,src:d,top:b,bot:b+a.height()}}});e.imgSelector&&$(e.imgSelector).each(function(c){var a=$(this),d=a.attr("data-src");if(d!="")if(f[c]={dom:a,src:d,y:a.offset().top},a.css("height"))f[c].b=f[c].y+parseInt(a.css("height"));else if(a.attr("height"))f[c].b=f[c].y+parseInt(a.attr("height"))});g.scroll(j).resize(j);(i==""||$("a#"+i+"[name="+i+"]").length==0)&&j()})};

//�ֲ�
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

