module.exports = function(app, db) {
  app.get('/shorttmks', (req, res) => {
    const parsingDeadline = new Date();

    parsingDeadline.setMonth(parsingDeadline.getMonth() - 1);

    db.collection('shorttmks').findAndModify(
      {$or: [{parsed: false}, {lastParsed: {$lte: parsingDeadline}}]},
      [['lastParsed', 'asc']],
      { $set: { parsed: true, lastParsed: new Date() } },
      {},
      (err, tmk) => {
        if (err) {
          res.send({error: err});
        } else {
          res.send({data: tmk.value});
        }
      }
    );
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
