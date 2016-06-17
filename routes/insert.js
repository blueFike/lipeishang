var express = require('express');
var router = express.Router();
var fs = require("fs");

router.post('/item', function (req, res,next) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err)  return next(err);
        
        var items = JSON.parse(data);

       getInsertItem(items, req, res);

    });
});

function getInsertItem(items, req, res) {

    var insertItem = req.body;

    if (!('string' != typeof insertItem.barcode || typeof (insertItem.name) != 'string'
        || typeof (insertItem.unit) != 'string' || typeof (insertItem.price) != 'number')) {
        insertOneItem(items, insertItem, res);
    }
    else {
        res.status(400).send('');
    }
}

function insertOneItem(items, insertItem, res,next) {
    fs.readFile('./max-id.json', 'utf-8', function (err, data) {
        if (err) return next(err);

        var id = JSON.parse(data);

        var maxId = ++(id.maxId);
        console.log(id);
        console.log(maxId);
        var item = {
            "id": maxId,
            "barcode": insertItem.barcode,
            "name": insertItem.name,
            "unit": insertItem.unit,
            "price": insertItem.price
        };
        items.push(item);
        updateMaxId(maxId, res);
        writeFile(items, res);
    });
}

function updateMaxId(maxId,next) {

    fs.writeFile('./max-id.json', JSON.stringify({maxId:maxId}), function (err) {
        if (err) return next(err);
        return;
    });
}

function writeFile(items, res,next) {

    fs.writeFile('./data.json', JSON.stringify(items), function (err) {
        if (err) return next(err);
        
        res.status(201).json(items[items.length - 1]);
    });
}

module.exports = router;