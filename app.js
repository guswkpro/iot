var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3000; //*

var server = app.listen(port, function () {
	console.log("Express server has started on port 3000")
});

var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');

var client = mysql.createConnection({
	host: 'stweb.ccmxaq6oosug.ap-northeast-2.rds.amazonaws.com'
	, port: 3306
	, user: 'stweb'
	, password: 'stwebstweb'
	, database: 'okgoogle'
});

/********************
        GET
********************/
app.get('/', function (req, res) {
	client.query('UPDATE okgoogle.okgoogle_datas set data_number = ? where data_idx = ?', [Number(req.param("type")), Number(1)], function (error, result) {
		if (error) {
			console.log(error);
			res.json({
				RESULT: "0",
				ERROR: error
			});
		} else {
			res.json({
				RESULT: "1"
			});
		}
	});
});
app.post('/', function (req, res) {
	res.json({
		RESULT: "1"
	});
	// if (req.body.value == "콜라") {
	// 	res.json({
	// 		speech: "시원한 콜라 한캔 받으세요.",
	// 		displayText: "시원한 콜라 한캔 받으세요.",
	// 		RESULT: "1"
	// 	});
	// } else if (req.body.value == "사이다") {
	// 	res.json({
	// 		speech: "시원한 사이다 한캔 받으세요.",
	// 		displayText: "시원한 사이다 한캔 받으세요.",
	// 		RESULT: "2"
	// 	})
	// }
});

app.get('/getdata', function (req, res) {
	client.query('SELECT * from okgoogle.okgoogle_datas', [], function (error, result) {
		if (error) {
			console.log(error);
			res.json({
				RESULT: "0",
				ERROR: error
			});
		} else {
			res.json({
				RESULT: result
			});
		}
	});
});