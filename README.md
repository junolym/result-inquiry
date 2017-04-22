# result-inquiry
Query grade and rank by student number and identity card number.

通过输入学号和身份证后几位查询对应信息。
应用场景：有一个表格的信息，要给每个人看他对应的那一行，又不能整个分享出去。
非常简单的一个小程序，需要Nodejs。

# change log
## Version.1
 - 简单原型程序，单文件编程，内含代码、数据、html模板。

## Version.2
 - 使用Bootstrap重写html模板，确定基本界面。

## Version.2.1
 - 加入专业总人数统计

## Version.3
 - 使用Express重写程序，数据使用json存储，html模板使用hbs，css文件分离。
 - 专业总人数使用程序自动统计

## Version.3.1
 - 使用fs.watchFile监控json文件变动并自动更新
 - 首页加入相关的提醒
 - 加入favicon
