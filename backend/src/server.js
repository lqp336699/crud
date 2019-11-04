
import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

var url = "mongodb://localhost:27017/";

mongodb.MongoClient.connect(url,  { useUnifiedTopology: true }, function(err, db) {

    if (err) throw err;

    var dbo = db.db("crud");

    app.get('/api/games',(req,res)=>{
        dbo.collection("games"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            res.json({result});
        });
    });

    app.post('/api/save',(req, res)=>{
        const game = req.body;
        const { error, isValid } = validData(game);

        if(isValid){
            dbo.collection("games").insertOne(game, function(err, result) {
                if (err) {
                    res.status(500).json({ errors: { global: "Something went wrong" } });
                } else{
                    res.json({ game: result.ops[0] });
                }
            });
        } else {
            res.status(400).json({ error });
        }
    });


    app.delete('/game/:id',(req,res)=>{
        dbo.collection("games").deleteOne(req.params._id, function(err, obj) {
            if (err) throw err;
        });
    })

});

// 字段的验证
const validData = (data)=>{
    let error = {};
    if(data.cover === ''){error.cover = 'can not be empty'}
    if(data.name === ''){error.name = 'can not be empty'}

    const isValid = Object.keys(error).length===0;
    return { error, isValid}
};


app.listen(5000,()=>{
    console.log("server is running on localhost:5000")
});
