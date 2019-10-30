import express from 'express'
import mongodb from 'mongodb'

const app = express();
const dbUrl = "mongodb://localhost";

var url = "mongodb://localhost:27017";

mongodb.MongoClient.connect(url , { useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    var dbo = db.db("crud");

    app.get('/api/games',(req,res)=>{
        dbo.collection("games"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;

            res.json({ result });
        });
    });

});

app.listen(8080,()=>{
    console.log("server is run  on localhost:8080")
});
