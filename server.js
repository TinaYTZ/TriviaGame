var express=require('express'),
    app = express(),
    server= require('http').createServer(app);
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


server.listen(process.env.PORT || 3000);
console.log('server running PORT 3000...');
app.use(express.static('./'));

var fb;
var db;
var MongoClient = mongodb.MongoClient;
var id;
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, database){
    		if(!err) {
       		 	console.log("We are connected");
       		 	db=database;
    		    db.collection('question').find({}).toArray(function (err, result) {
    	  			if (err) {
          				console.log(err);
     	 			} 
     	 			else if (result.length) {
       		 			id=result.length+1;
       		 			console.log(id);
     	 				} else {
        				console.log('No document(s) found with defined "find" criteria!');
     		 		}
  				});
    		}
    		else{console.log(err);} 

    	});



app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});


app.get('/question', function(req,res){
    //res.sendFile(__dirname+'/public/index.html');
    db.collection('question').find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
      	console.log(result);
        var randomID=Math.floor(Math.random() * result.length + 1);
      	fb={ 'question':result[randomID].question,
      		 'answerId':result[randomID].answerId};
        console.log(result.length+'Found:', result[randomID]);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
  });

    res.json(fb)
    
});


app.get('/score', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});


app.post('/question', function(req,res){
    //res.sendFile(__dirname+'/public/index.html'); 
    console.log(req.body.question);
     db.collection('question').insert({ 'question': req.body.question,
    					                  'answer': req.body.answer,
    					                'answerId':id 
    				});
     id=id+1;
//     res.json({'result':'success'});

});


app.post('/answer', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});


