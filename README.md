大话2 2014年3月 官网改版源文件
=====

这次是官网的第二次改版，吸取了之前改版的经验，对于重构代码和代码效率都加深了理解，并且进行了对应的优化
fabu.html为配套在发布系统的版本，可以作为学习模板。

整个文件夹可以作为一个参考demo，这个分支作为一个改版的记录

*制作软件：Webstorm8

*压缩文件：<a href="http://tool.css-js.com/" target="_blank">http://tool.css-js.com/</a>


相关备忘：
---------
>1.技术联系人：Mr.F    编辑联系人：追逐、老头     设计师：kk

>2.相关配置链接：<a href="http://note.youdao.com/share/?id=9cb34a908135877f5435d25d60db0d28&type=note" target="_blank">笔记链接</a>

改版记录：
---------
###1.接到设计稿并开始相关规划 - 2014.3.15

![结构规划](http://117.18.10.164/2.jpg "初期结构规划")

![CSS语法规划](http://117.18.10.164/1.jpg "CSS语法规划")

![相关模块算法规划](http://117.18.10.164/3.jpg "相关模块算法规划")

###2.开始制作 - 2014.3.20

###3.接到最后设计稿时间 - 2014.3.28

###4.初步制作完成 - 2014.4.2  10:00
>（1）官网的初步demo地址为：<a href="http://xy2.163.com/2014/gw/" target="_blank">http://xy2.163.com/2014/gw/</a>

>（2）整体页面已经制作完成，缺各种交互，底部也没有制作完成

>（3）建立一个方便编辑查看官网注意事项的笔记：<a href="http://note.youdao.com/share/?id=9cb34a908135877f5435d25d60db0d28&type=note" target="_blank">有道云笔记link</a>

>（4）设计师根据初稿修改意见为：<a href="http://note.youdao.com/share/?id=0f64c12116b1fab9eb8fae6a1c370477&type=note" target="_blank">有道云笔记link</a>

>（5）编辑修改意见为：<a href="http://note.youdao.com/share/?id=490c7cc2c38c39120965692b869cc0d7&type=note " target="_blank">有道云笔记link</a>

###5.开始一期修改 - 2014.4.4 10:00 - 17:40

一期修改后地址为：<a href="http://xy2.163.com/2014/gw/indexv2.html" target="_blank">http://xy2.163.com/2014/gw/indexv2.html</a>

###6.开始配置新闻发布系统的嵌套页面 - 2014.4.6 20:18

 >--LunboBanner 版头轮播Banner

 >--LunboTitle 版头轮播标题

 >--SmartBanner 广告

 >--News1 最新

 >--News2 新闻

 >--News3 维护

 >--News4 公告

 >--News5 专题

 >--News6 推荐

 >--News7 回顾

 >--News8 玩家

 >--News9 热帖

 >--News10 开发者大会

 >--Day1 周一

 >--Day2 周二

 >--Day3 周三

 >--Day4 周四

 >--Day5 周五

 >--Day6 周六

 >--Day7 周日

 >--Entry1 快速入口

 >--Entry2 快速入口2

 >--Entry3 快速入口3

 >--Entry4 周末活动

 >--ServerName 服务器名称

 >--ServerName2 版头服务器

 >--ServerTime 服务器时间

 >--HotShow 热门推荐

 >--Editor 小编推荐

 >--Pic1 大话最牛

 >--Pic2 热门牛图

 >--Pic3 大话画廊

 >--Pic4 真人秀

 >--Pic5 游戏壁纸

 >--Pic6 精美周边

 >--Product 产品推荐

 >--GuideNew 最新攻略

 >--VideoZone 录像专区

 >--Fight 天下比武大会

 >--GuideCommon 常用攻略

 >--MovieZone 视频专区

 >--TeamWork 官网团队

###7.配置发布系统相关栏目 - 2014.4.8  16:15pm

>索引页面模板为：14v1官网

![发布系统栏目配置](http://117.18.10.164/fabu.jpg "发布系统栏目配置")


###8.修改发布系统相关配置，并重新更新栏目- 2014.4.9

>(1) 修改页面相关缺漏的链接

>(2) 补上西行谷的iframe地址：http://game.163.com/special/iframe/dh2_qt2014.html

>(3) 相关子栏目的添加

###9.设计师给交互设计稿，开始补充相关交互和修改相关细节 - 2014.4.11 - 4.12

>顶部导航交互添加

>调整左边banner大小，并调整热门推荐margin大小

>增加快速入口相关样式（关闭按钮交互、日历样式、新服样式），并添加对应的栏目

>图库区域修改样式，左边的小编推荐也修改图片标题样式

>最新攻略旁边增加“玩家攻略”样式

###10.设计师给交互设计稿2稿，继续补充相关交互和修改相关细节 - 2014.4.14

>修改底部相关模块，加上白色底

>快速入口最后一个改成百科

>热门推荐增加字数限制

>图库精选重新修改样式

###11.设计师给交互设计稿3稿，继续补充相关交互和修改相关细节 - 2014.4.16 - 4.17

>增加各种按钮交互（查看更多、进入图库、我要上传）

>最新攻略、西行谷、大话知道添加“查看更多”按钮

>版头增加新服推荐

###12.基本完成所有交互 - 2014.4.18

> Firefox下出现无法支持CSS3字体的问题，是因为字体文件的跨域问题

  ```html
 解决方法：
 发邮件给游戏部的SA，帮忙加响应头部

 收件人：caifeng<caifeng@corp.netease.com>
 抄送：wyhuang<wyhuang@corp.netease.com>, ftan<ftan@corp.netease.com>
 邮件格式：
 Hi 蔡锋：
 　　大话2官网使用CSS3自定义字体（@font-face）来制作纯色图标，字体文件的调用涉及跨域问题，需要在文件的http响应头部添加： Access-Control-Allow-Origin:*
 涉及文件是线上 /xy2_2012_all/xy2_2012/2014/gw/  目录下所有文件，感谢！
 ```
###13.填写好缺失的链接，并开始兼容性测试 - 2014.4.22

 >佳文提供的链接笔记：<a href="http://note.youdao.com/share/?id=bdac156e6fb8b16b73ccf005a6a55c4e&type=note" target="_blank">笔记链接</a>

 >增加下载专区的Flash部件

 >修改相关bug

 >增加你提我改栏目

 >添加新闻未读数量

 >西行谷Iframe负责人：孙磊 leis@corp.netease.com  陈希成 hzchenxch@corp.netease.com

###14.修复相关UI细节，兼容性测试，并准备上线 - 2014.4.24

