var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', require('./routes/getOneItem.js'));
app.use('/', require('./routes/getAllItems.js'));
app.use('/', require('./routes/insert.js'));
app.use('/', require('./routes/delete.js'));
app.use('/', require('./routes/update.js'));

app.use(function (err,req,res,next) {
    console.log(err);
    res.status(500).send('Some errors happened,please see the log on sever');
});

app.listen(8081);