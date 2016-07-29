var express = require('express');
var router = express.Router();

var title = 'remix party wip';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('remixes', {
    title: title,
    menu: 'remixes'
  });
});
router.get('/remix', function(req, res) {
  res.render('remix', {
    title: title,
    menu: 'remix'
  });
});
router.get('/info', function(req, res) {
  res.render('info', {
    title: title,
    menu: 'info'
  });
});
router.get('/remixes', function(req, res) {
  res.render('remixes', {
    title: title,
    menu: 'remixes'
  });
});

module.exports = router;
