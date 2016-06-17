var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/items', function (req, res,next) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err)  return next(err);
        
        var items = JSON.parse(data);
        res.status(200).json(items);
        
        return;
    });
});



module.exports = router;
