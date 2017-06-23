var express = require('express');
var router = express.Router();

router.get('/gallery', function(req, res) {
	res.render('photography', {
		total: "62"
	});
});

router.all('/error', function(req, res) {
	res.render('error');
});

router.all('*', function(req, res) {
	res.redirect("/gallery");
});

module.exports = router;