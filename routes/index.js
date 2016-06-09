var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 're:mix party wip',
    infoActive: ''
  });
});

router.get('/info', function(req, res) {
  res.render('index', {
    title: 're:mix party wip',
    infoActive: 'active'
  });
});

module.exports = router;
