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
            if (!infos[data.username]) {
                showError(res, '系统中无该学号');
            } else if (infos[data.username].password != data.password) {
                showError(res, '身份证或护照号有误');
            } else {
                showInfo(infos[data.username], res);
            }
        });
    }
}

function showHtml(res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + login + htmlFoot);
}

function showError(res, err) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + login+error.replace('ERROR', err) + htmlFoot);
}

function showInfo(data, res) {
    var result = dataModel.replace('NAME', data.name)
                        .replace('MAJOR', data.major)
                        .replace('SUM', sums[data.major])
                        .replace('SCORE', data.s1)
                        .replace('RANGE', data.r1);

    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(htmlHead + result + htmlFoot);
}


var htmlHead = (function() {/*
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>2015级成绩查询</title>
    <!-- <link href="bootstrap.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <style type="text/css">
        body {
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #eee;
        }
        .form-signin {
          max-width: 330px;
          padding: 15px;
          margin: 0 auto;
        }
        .form-signin .form-signin-heading,
        .form-signin input,
        .form-signin button {
          margin-bottom: 10px;
        }
        .form-signin .checkbox {
          font-weight: normal;
        }
        .form-signin .form-control {
          position: relative;
          height: auto;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          padding: 10px;
          font-size: 16px;
        }
        .form-signin .form-control:focus {
          z-index: 2;
        }
        .form-signin input[type="email"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        .panel-heading {
            float: left;
            width: 145px;
        }
        .panel-body {
            padding: 10px 20px 0 160px;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <form class="form-signin" action="" method="post">
*/}).toString().slice(16, -3);

var login = (function() {/*
            <h2 class="form-signin-heading">2015级成绩查询</h2>
            <input type="number" name="username" class="form-control" placeholder="学号" required autofocus>
            <input type="password" name="password" class="form-control" placeholder="身份证后6位，留学生请输入护照" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">查询</button>
*/}).toString().slice(16, -3);

var error = (function() {/*
            <div class="alert alert-danger" role="alert">ERROR</div>
*/}).toString().slice(16, -3);

var dataModel = (function() {/*
            <div class="panel panel-info">
                <div class="panel-heading">姓名</div>
                <div class="panel-body">NAME</div>
                <div class="panel-heading">专业</div>
                <div class="panel-body">MAJOR</div>
                <div class="panel-heading">专业总人数</div>
                <div class="panel-body">SUM</div>
                <div class="panel-heading">第一学年绩点</div>
                <div class="panel-body">SCORE</div>
                <div class="panel-heading">第一学年专业排名</div>
                <div class="panel-body">RANGE</div>
            </div>
            <a class="btn btn-lg btn-primary btn-block" href="">返回</a>
*/}).toString().slice(16, -3);

var htmlFoot = (function() {/*
        </form>
    </div>
  </body>
</html>
*/}).toString().slice(16, -3);



var infos = {
123456 : { name:"样例",major:"人力资源管理",password:'123456',s1:5.0,r1:1}
};

// 各专业总人数，需自行统计
var sums = {
    "人力资源管理" : 133,
    "市场营销" : 101,
    "会计学" : 159,
    "国际经济与贸易" : 47,
    "金融学" : 229,
    "经济学" : 39
}