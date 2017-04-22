var fs = require('fs');
var express = require('express');
var router = express.Router();

var info = sumOfMajor = {};
var jsonFilePath = __dirname + '/../private/info.json';

function updateInfo() {
    try {
        for (var i in require.cache) {
            if (i.match('info.json'))
                delete require.cache[i];
        }
        info = require(jsonFilePath);
        sumOfMajor = {};
        for (var i in info) {
            sumOfMajor[info[i].major] = sumOfMajor[info[i].major] || 0;
            sumOfMajor[info[i].major]++;
        }
        console.log(Date(), 'Info updated !');
    } catch (e) {
        console.log(Date(), e);
    }
}

updateInfo();

fs.watchFile(jsonFilePath, (curr, prev) => {
    updateInfo();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    if (!req.body || !req.body.username || !req.body.password) {
        res.render('failed', { error : '请输入学号和身份证后6位（留学生为护照）' });
    }

    else {
        if (!info[req.body.username]) {
            res.render('failed', { error : '系统中无该学号' });
        }

        else if (info[req.body.username].password.toUpperCase() != req.body.password.toUpperCase()) {
            res.render('failed', { error : '身份证或护照号有误' });
        }

        else {
            var user = info[req.body.username];
            console.log(Date() + ' - ' + req.body.username + ' - ' + user.name);
            user.sum = sumOfMajor[user.major];
            res.render('result', user);
        }

    }
});

module.exports = router;
