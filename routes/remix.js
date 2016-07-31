var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/remixlist', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/addremix', function(req, res) {
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
 * DELETE to deleteuser.
 */
router.delete('/deleteremix/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('remixlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
