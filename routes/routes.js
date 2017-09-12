var express = require('express');
var router = express.Router();
const https = require('https');

var myLogger = function(req, res, next) {

	var requesturl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=1fef0d48fabf9f81d41add4a13f43652&photo_id=' + req.params.pid + '&format=json&nojsoncallback=?';
	https.get(requesturl, (res) => {
		res.setEncoding('binary');
		var data = [];
		var result;
		res.on('data', function(chunk) {
			data.push(chunk);
			result = JSON.parse(data);
			if (result.stat == 'ok') {
				var urlContruct = 'https://farm' + result.photo.farm + '.staticflickr.com/' + result.photo.server + '/' + result.photo.id + '_' + result.photo.originalsecret + '_o.' + result.photo.originalformat;
			}
		});
		res.on('error', function(err) {
			console.log("Error during HTTP request");
			console.log(err.message);
		});
	});
	next()


}

router.get('/gallery/:pid', myLogger, function(req, res) {
	res.render('photography', {
		total: "62",
		pid: req.params.pid
	});
});

router.get('/gallery/', function(req, res) {
	res.render('photography', {
		total: "62"
	});
});

router.all('/error', function(req, res) {
	res.render('error');
});


module.exports = router;