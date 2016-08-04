var express = require('express');
var router = express.Router();

/*
 * GET archivelist.
 */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    collection.find({},{sort: {'_id': -1}},function(e,docs){
        res.json(docs);
    });
});
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
router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('archivelist');
    var remixId = req.params.id;
    collection.findOne({ '_id' : remixId }, function(e,docs) {
        res.json(docs);
    });
});

/*
 * POST to addremix
 */
// router.post('/add', function(req, res) {
//     var db = req.db;
//     var collection = db.get('remixlist');
//     collection.insert({
//       'fullname': req.body.fullname,
//       'email': req.body.email,
//       'thumb': req.body.thumb,
//       'remix': req.body.remix,
//       'remixsvg': req.body.remixsvg,
//       'remixsrc': req.body.remixsrc,
//       'date': new Date()
//     }, function(err, result){
//         res.send(
//             (err === null) ? { msg: '' } : { msg: err }
//         );
//     });
// });

/*
 * DELETE to deleteuser.
 */
// router.delete('/delete/:id', function(req, res) {
//     var db = req.db;
//     var collection = db.get('remixlist');
//     var userToDelete = req.params.id;
//     collection.remove({ '_id' : userToDelete }, function(err) {
//         res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
//     });
// });

module.exports = router;
