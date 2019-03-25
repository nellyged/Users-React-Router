const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const port = process.env.PORT || 3000;

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
