var express = require('express');
var router = express.Router();
import Document from '../models/document';

router.post('/createDocument', function(req, res) {
  console.log('got to create document');
  console.log(req);
  new Document({
    owner: req.user._id, //mongoDB //
    collaborators: [req.user._id], //owner is a collaborator
    name: req.body.name,
    rawState: req.body.rawState,
    shareURI: "", //make this the mondoDB id
    //TODO: fix this
    createDate: new Date(),
    lastSaved: new Date()
  }).save()
  .then(function(document){
    console.log('successfully saved document', docuement);
    res.send(document);
  })
  .catch(function(error){
    console.log("ERROR", error);
    res.send(error)
  })
});

router.get('/loadDocumentsByUser', function(req, res) {
  Document.find({owner:req.user._id})
  .then( function(documents){
    console.log('found documents', documents);
    res.send(documents)
  })
  .catch(function(error) {
    console.log('ERROR cant find documetns from this user', error);
    res.send(error)
  })
});

router.post('/editDocument', function(req, res) {

});

router.post('/deleteDocument', function(req, res) {

});



export default router;



// //on frontend
// //on component did mount, grab a user and throw it in state
// 
//
// componentDidMount() {
//   var self = this;

// }
//
//
//
//
// // on Backend
