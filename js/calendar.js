/*日历插件：by:LGY
 --------------------*/
function LGY_calendar(option){
    var oWrap = this.getId(option.wrapId);
    if(!oWrap) return;
    this.oWrap = oWrap;
    this.oHead = this.getByClassName('g-calendar-hd',this.oWrap)[0];
    this.oBody = this.getByClassName('g-calendar-bd',this.oWrap)[0];
    this.oTit = this.getByClassName('g-calendar-tit',this.oWrap)[0];
    this.oPrev = this.getByClassName('g-calendar-prev',this.oWrap)[0];
    this.oNext = this.getByClassName('g-calendar-next',this.oWrap)[0];
    this.init();
}
LGY_calendar.prototype = {
    ///////////获取ID元素
    getId:function(id){
        return document.getElementById(id);
    },
    ////////获取css类名元素
    getByClassName:function(className,parent){
        var elem = [],
            node = parent != undefined&&parent.nodeType==1?parent.getElementsByTagName('*'):document.getElementsByTagName('*'),
            p = new RegExp("(^|\\s)"+className+"(\\s|$)");
        for(var n=0,i=node.length;n<i;n++){
            if(p.test(node[n].className)){
                elem.push(node[n]);
            }
        }
        return elem;
    },
    //填充日历
    fillDate:function(year,month){
        //本月份第一天是星期几 - 为显示上个月份的天数做铺垫
        var first_day = new Date(year,month,1).getDay(),
        //如果刚好是星期天，则空出一行（显示上个月的天数）
            first_day = first_day == 0?first_day=7:first_day;
        //本月份最后一天是几号
        final_date = new Date(year,month+1,0).getDate(),
            //上个月的最后一天是几号
            last_date = new Date(year,month,0).getDate(),
            //剩余的格子数--即排在末尾的格子数
            surplus = 42 - first_day - final_date;
        /*设置表头的日历
         ---------------------------*/
        this.oHead.innerHTML = year+'年'+(month+1)+'月';
        /*填充日历执行
         ---------------------------*/
        var html = '';
        var lmonth = (Array(2).join(0)+(parseInt(month)+ 1)).slice(-2),
            tmonth = (Array(2).join(0)+(parseInt(month))).slice(-2),
            nmonth = (Array(2).join(0)+(parseInt(month)+ 2)).slice(-2);
        //上个月的显示天数
        for(var i=0;i<first_day;i++){
            html+='<span class="g-calendar-grey" data-time='+year+tmonth+(Array(2).join(0)+(last_date-(first_day-1)+i)).slice(-2)+'>'+(last_date-(first_day-1)+i)+'</span>';
        }
        //本月的显示天数
        for(var j=0;j<final_date;j++){
            html+='<span data-time='+year+lmonth+(Array(2).join(0)+(j+1)).slice(-2)+'>'+(j+1)+'</span>';
        }
        //下个月的显示天数
        for(var k=0;k<surplus;k++){
            html+='<span class="g-calendar-grey"  data-time='+year+nmonth+(Array(2).join(0)+(k+1)).slice(-2)+'>'+(k+1)+'</span>';
        }
        //fill
        this.oBody.innerHTML = html;
        var span_list =this.oBody.getElementsByTagName("span");
        for(var i=0;i<span_list.length;i++){
            for(var j in diary){
                if(diary[j]["Date"] == span_list[i].getAttribute('data-time')){
                    var act = '<em>'
                    for(var x =0;x<diary[j]["Activity"].length;x++){
                        act += '<a href="'+diary[j]["Activity"][x]["url"]+'" target="_blank">'+diary[j]["Activity"][x]["name"]+'</a>'
                    }
                    act +='</em>'
                    span_list[i].innerHTML += act;
                }
            }
        }

        // 当前状态
        if(year==this.c_year&&this.c_month==month){
            this.oBody.getElementsByTagName('span')[first_day+this.date-1].className='g-calendar-on';
        }
    },
    // next切换
    next:function(){
        var _that = this;
        this.oNext.onclick = function(){
            _that.month++;
            if(_that.month>11){
                _that.month = 0;
                _that.year++;
            }
            // 填充日历
            _that.fillDate(_that.year,_that.month);
        }

    },
    // prev切换
    prev:function(){
        var _that = this;
        this.oPrev.onclick = function(){
            _that.month--;
            if(_that.month<0){
                _that.month = 11;
                _that.year--;
            }
            // 填充日历
            _that.fillDate(_that.year,_that.month);
        }

    },
    init:function(){
        this.oTit.innerHTML = '<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>';
        // 获取今天的日历时间
        var now = new Date();
        this.c_year = this.year = now.getFullYear();
        this.c_month = this.month = now.getMonth();
        this.date = now.getDate();
        // 初始化--填充日历
        this.fillDate(this.year,this.month);
        //next切换
        this.next();
        //prev切换
        this.prev();
    }
}