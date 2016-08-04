var express = require('express');
var router = express.Router();

var title = 'remix party';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: title
  });
});
router.get('/remix', function(req, res) {
  res.render('remix', {
    title: title,
    menu: 'remix'
  });
});

module.exports = router;
