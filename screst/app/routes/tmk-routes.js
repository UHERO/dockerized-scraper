const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/shorttmks', (req, res) => {
    // const num = parseInt(req.query.num, 10);
    const parsingDeadline = new Date();

    parsingDeadline.setMonth(parsingDeadline.getMonth() - 2);

    console.log(parsingDeadline);

    db.collection('shorttmks').find({ $or: [{parsed: false}, {lastParsed: {$lte: parsingDeadline}}]}, (err, tmks) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        tmks.limit(7000).toArray((err, tmks) => {
          if (err) {
            res.send({error: err});
          } else {
            res.send({data: tmks});
          }
        });
      }
    });
  });

  app.post('/shorttmks/:id', (req, res) => {
    const id = req.params.id;
    const note = {TMK: Number(id), parsed: req.body.body, lastParsed: new Date() };
    // const details = {'_id': new ObjectID(id)};
    db.collection('shorttmks').update({TMK: Number(id)}, note, {upsert: true}, (err) => {
      if (err) {
        res.send({'error': 'An error has occurred: ', err});
      } else {
        res.send(`Object ${note.TMK} is processed`);
	    }
    });
  });

  app.post('/permits/:appnumber', (req, res) => {
    const permit = { appNumber: req.params.appnumber, permit: req.body};
    db.collection('permits').update({appNumber: permit.appNumber}, permit, {upsert: true}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });
};
