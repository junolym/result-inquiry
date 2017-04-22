var http = require('http');
http.createServer(server).listen(3000);

var querystring = require('querystring');

function server(req, res) {
    if (req.method == 'GET') {
        showHtml(res);
    } else if (req.method == 'POST') {
        var data = '';
        req.addListener('data', (chunk) => data += chunk)
        .addListener('end', () => {
            data = querystring.parse(data);
            if (infos[data.username] && infos[data.username].password == data.password) {
                showInfo(infos[data.username], res);
            } else {
                showError(res);
            }
        });
    }
}

function showHtml(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + login + htmlFoot);
}

function showError(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + login+error + htmlFoot);
}

function showInfo(data, res) {
    var result = dataModel.replace('NAME', data.name)
                        .replace('MAJOR', data.major)
                        .replace('SCORE', data.s1)
                        .replace('RANGE', data.r1);

    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + result + htmlFoot);
}


var htmlHead = (function() {/*
<!DOCTYPE html>
<html>
<head>
    <title>成绩排名查询</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body style="width: 350px; margin: auto;text-align: center;">
*/}).toString().slice(16, -3);

var login = (function() {/*
    <h1>成绩排名查询</h1>
    <form id="myform" action="" method="post">
        <p>学号：<input type="text" name="username"></p>
        <p>密码：<input type="password" name="password"></p>
        <p>(身份证后6位或护照后8位)</p>
        <p><input type="submit" value="提交" /></p>
    </form>
*/}).toString().slice(16, -3);

var error = (function() {/*
    <p>用户不存在，请重新查询</p>
*/}).toString().slice(16, -3);

var dataModel = (function() {/*
    <h1>成绩排名信息</h1>
    <div style="text-align: left;margin-left: 50px;">
        <p>姓　　　　名：<span style="margin-left: 30px;">NAME</span></p>
        <p>专　　　　业：<span style="margin-left: 30px;">MAJOR</span></p>
        <p>大一学年绩点：<span style="margin-left: 30px;">SCORE</span></p>
        <p>大一学年排名：<span style="margin-left: 30px;">RANGE</span></p>
    </div>
*/}).toString().slice(16, -3);

var htmlFoot = (function() {/*
</body>
</html>
*/}).toString().slice(16, -3);


var infos = {
123456 : { name:"你猜猜",major:"电脑控制挖掘机",password:'123456',s1:100,r1:1}
};