var express = require('express');
var router = express.Router();

var title = 'remix party';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    appTitle: title
  });
});

module.exports = router;
