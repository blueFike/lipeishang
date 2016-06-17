var express = require('express');
var router = express.Router();
var fs = require("fs");

router.delete('/items/:id', function (req, res,next) {
    fs.readFile('./data.json', 'utf-8', function (err, data) {
        if (err)  return next(err);

        var item = JSON.parse(data);

        deleteItem(item, req, res);
    });
});

function deleteItem(item, req, res) {
     var length = item.length;
     for (var i = 0; i < length; i++) {
        if (item[i].id === parseInt(req.params.id)) {
            item.splice(i, 1);
            break;
        }
     }
    if(item.length === length - 1){
        writeFile(item);
        res.status(204).send('');
    }else {
        res.status(404).send('');
    }
}

function writeFile(item,next) {
    fs.writeFile('./data.json', JSON.stringify(item), function (err) {
        if(err) return next(err);
    });
}

module.exports = router;