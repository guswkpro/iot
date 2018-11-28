var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var fs = require('fs');
var server = app.listen(3000, function () {
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
app.get('/', function(req, res){
	client.query('UPDATE okgoogle.okgoogle_datas set data_number = ? where data_idx = ?', [Number(req.param("type")), Number(1)], function(error, result){
		if(error){
			console.log(error);
			res.json({
				RESULT : "0"
			});
		} else {
			res.json({
				RESULT : "1"
			});
		}
	});
});
app.post('/', function(req, res){
	console.log('aaa');
	console.log(req.header);
	console.log(req.body);
	res.json({
		RESULT : "1"
	});
});

app.get('/test', function(req, res){
	client.query('SELECT * from okgoogle.okgoogle_datas', [], function(error, result){
		if(error){
			console.log(error);
			res.json({
				RESULT : "0"
			});
		} else {
			res.json({
				RESULT : result
			});
		}
	});
});

app.get('/test2', function(req, res){
	    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<h3>Welcome</h3>');
    res.write('<a href="/login">Please login</a>');
    res.end();
});

app.get('/test3', function(req, res){
	res.json({
		RESULT : "1"
	});
});