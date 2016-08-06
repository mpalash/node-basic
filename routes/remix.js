var express = require('express');
var router = express.Router();

var title = 'remix party';

/*
 * GET list
 */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    collection.find({},{sort: {'_id': -1}},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET thumbs
 */
router.get('/thumbs', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    collection.count('_id',function(e, num){
      console.log(num);
    });
    collection.find({},{
      sort: {'_id': -1},
      fields: {
        thumb: 1
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
    var collection = db.get('remixlist');
    var remixId = req.params.id;
    collection.findOne({ '_id' : remixId }, function(e,docs) {
        res.json(docs);
    });
});

/*
 * POST to add
 */
router.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    collection.insert({
      'fullname': req.body.fullname,
      'email': req.body.email,
      'thumb': req.body.thumb,
      'remix': req.body.remix,
      'remixsvg': req.body.remixsvg,
      'remixsrc': req.body.remixsrc,
      'date': new Date()
    }, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to trash.
 */
router.delete('/trash/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
