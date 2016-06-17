var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/items/:id', function (req, res,next) {

    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err) return next(err);
        
        var item = JSON.parse(data);
        getOneItem(item, req, res);
    });
});

function getOneItem(item, req, res) {
    for (var i = 0; i < item.length; i++) {
        if ((item[i].id) === parseInt(req.params.id)) {
            res.status(200).json(item[i]);

            return;
        }
    }
    res.status(404).send('');
}

module.exports = router;
