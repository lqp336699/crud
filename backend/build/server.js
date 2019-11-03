'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

var url = "mongodb://localhost:27017/";

_mongodb2.default.MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {

    if (err) throw err;

    var dbo = db.db("crud");

    app.get('/api/games', function (req, res) {
        dbo.collection("games").find({}).toArray(function (err, result) {
            // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            res.json({ result: result });
        });
    });

    app.post('/api/save', function (req, res) {
        var game = req.body;

        var _validData = validData(game),
            error = _validData.error,
            isValid = _validData.isValid;

        if (isValid) {
            dbo.collection("games").insertOne(game, function (err, result) {
                if (err) {
                    res.status(500).json({ errors: { global: "Something went wrong" } });
                } else {
                    res.json({ game: result.ops[0] });
                }
            });
        } else {
            res.status(400).json({ error: error });
        }
    });
});

// 字段的验证
var validData = function validData(data) {
    var error = {};
    if (data.cover === '') {
        error.cover = 'can not be empty';
    }
    if (data.name === '') {
        error.name = 'can not be empty';
    }

    var isValid = Object.keys(error).length === 0;
    return { error: error, isValid: isValid };
};

app.listen(5000, function () {
    console.log("server is running on localhost:5000");
});
//# sourceMappingURL=server.js.map