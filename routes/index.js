var express = require('express');
var router = express.Router();

var title = 'remix party wip';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: title,
    infoActive: ''
  });
});

router.get('/info', function(req, res) {
  res.render('index', {
    title: title,
    infoActive: 'active'
  });
});

router.get('/remixes', function(req, res) {
  res.render('remixes', {
    title: title
  });
});

module.exports = router;
