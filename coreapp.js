const express = require ('express');
const coreapp = express();
const port = 3000;

coreapp.get('/',function(req,res){

    res.send('Hello world');
});

coreapp.listen(3000,function(){

    console.log('Backend Server started at port 3000');

});