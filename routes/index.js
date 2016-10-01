var express = require('express');
var moment = require('moment');
var router = express.Router();

var title = 'remix party';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    apptitle: title
  });
});

/* GET remix page */
router.get('/remix/', function(req, res) {
  res.render('remix', {
    apptitle: title
  });
});
router.get('/remix/new', function(req, res) {
  res.render('remix', {
    apptitle: title
  });
});
router.get('/remix/new/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('archivelist');
  var remixId = req.params.id;
  collection.findOne({ '_id' : remixId }, function(e,docs) {
    res.render('remix', {
      apptitle: title,
      remixsrc: docs.filename,
      srcurl: docs.srcurl,
      title: docs.title,
      meta: docs.meta
    });
  });
});

/*
 * GET one remix
 */
router.get('/remix/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('remixlist');
  var archCollection = db.get('archivelist');
  var remixId = req.params.id;

  collection.findOne({ '_id' : remixId }, function(e,docs) {
    var date = moment(Date.parse(docs.date)).format('D MMM YYYY');
    res.render('remix-id', {
      apptitle: title,
      remixsvg: docs.remixsvg,
      remixsrc: docs.remixsrc,
      fullname: docs.fullname,
      email: docs.email,
      date: date
    });
  });
});

/*
 * GET all remixes
 */
router.get('/all', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    collection.find({},{sort: {'_id': -1}},function(e,docs){
        docs.forEach(
          function(e, i, a) {
            e.displayDate = moment(Date.parse(e.date)).format('D MMM YYYY');
          }
        );
        res.render('remix-list', {
          apptitle: title,
          data: docs
        });
    });
});

module.exports = router;
