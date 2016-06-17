var express = require('express');
var router = express.Router();
var fs = require('fs');

router.put('/items/:id', function (req, res,next) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err)  return next(err);

       var items = JSON.parse(data);

        updateItems(items, req, res);
    });
});

function updateItems(items, req, res) {
    var item = req.body;

    if (!('string' != typeof item.barcode || typeof (item.name) != 'string'
        || typeof (item.unit) != 'string' || typeof (item.price) != 'number')) {

        getNewItems(items, item, req, res);
    }
    else {

        res.status(400).send('');
    }
}

function getNewItems(items, item, req, res) {

    for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(req.params.id)) {

            items[i].barcode = item.barcode;
            items[i].name = item.name;
            items[i].unit = item.unit;
            items[i].price = item.price;

            res.status(201).json(items[i]);
            writeFile(items, res);

            return;
        }
    }
    res.status(404).send('');
}

function writeFile(data,next) {
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {

        if (err) return next(err);
    });
}
module.exports = router;