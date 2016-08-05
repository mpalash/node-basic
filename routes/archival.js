var express = require('express');
var router = express.Router();

/*
 * GET list
 */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    collection.find({},{sort: {'_id': -1}},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET thumbs
 */
router.get('/thumbs', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    collection.find({},{
      sort: {'_id': -1},
      fields: {
        filename: 1
      }
    },function(e,docs){
        res.json(docs);
    });
});

/*
 * GET :id
 */
router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    var remixId = req.params.id;
    collection.findOne({ '_id' : remixId }, function(e,docs) {
        res.json(docs);
    });
});

/*
 * GET :id
 */
router.get('/file/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    var filename = req.params.name;
    collection.findOne({ 'filename' : filename }, function(e,docs) {
        res.json(docs);
    });
});

module.exports = router;
