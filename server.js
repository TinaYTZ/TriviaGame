var express=require('express'),
    app = express(),
    server= require('http').createServer(app);


server.listen(process.env.PORT || 3000);
console.log('server running PORT 3000...');
app.use(express.static('./'));

app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});


