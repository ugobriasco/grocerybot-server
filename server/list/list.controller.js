const List = require('./list.model');
const User = require('../user/user.model');

//Create a new list
exports.postList = (req, res) => {
  const list = new List();

  if (req.decoded._doc._id) {
    list.ownerID = req.body.req.decoded._doc._id;
  } else if (req.body.ownerID) {
    list.ownerID = req.body.ownerID;
  } else {
    res.status(400).send({ message: 'no ownerID defined' });
  }
  if (req.body.data) list.items.push(req.body.data);

  const message = list.items.length > 0 ? 'list created' : 'blank list created';

  list.save(function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: message, data: list });
  });
};

//query all list saved (admin function)
exports.getAllLists = (req, res) => {
  List.find(function(err, lists) {
    if (err) res.status(500).send(err);
    res.json({ data: lists });
  });
};

//loads the list fro the database
exports.loadList = (req, res, next) => {
  List.findById(req.params.objID)
    .exec()
    .then(
      list => {
        if (!list) {
          return res.status(404).send({
            message: 'List not found'
          });
        }
        req.dbList = list;
        return next();
      },
      e => next(e)
    );
};

// get a list given its _id - requires loadList
exports.getList = (req, res) => {
  if (req.dbList) res.json({ data: req.dbList });
};

//deleta a given list
exports.deleteList = (req, res) => {
  List.findByIdAndRemove(req.params.objID, function(err) {
    if (err) res.status(500).send(err);
    res.json({ message: 'List ' + req.params.objID + ' removed' });
  });
};

exports.replaceListItems = (req, res) => {
  if (req.dbList) {
    req.dbList.items.splice(0, req.dbList.items.length, req.body);
    Object.assign(req.dbList, req.body.data).save((err, list) => {
      if (err) res.status(500).send(err);
      res.json({ message: 'List updated!', list });
    });
  }
};
exports.isListOwner = function(req, res, next) {
  if (
    req.decoded._doc.role === 'Admin' ||
    req.decoded._doc.role === dbList.ownerID
  )
    next();
  else {
    res.status(401).send({
      message: 'the user has not the rights'
    });
  }
};
