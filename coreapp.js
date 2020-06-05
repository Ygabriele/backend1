const express = require ('express');
const coreapp = express();
const port = 3000;


coreapp.listen(port,function(){

    console.log('Backend Server has started at http://localhost:'+port);

});

//Respond to POST request on the root route (/) on the coreapp homepage

coreapp.post('/',function(req,res){

    res.send('Got a POST request');
});



//Respond with Hello World on the homepage

coreapp.get('/',function(req,res){

    res.send('Hello world');
});




//Respond to a PUT request on the route  user (/user) on the coreapp

coreapp.put('/user',function(req,res){

    res.send('Got a PUT request at /user');
});



//Respond to a DELETE request on the route  user (/user) on the coreapp 

coreapp.delete('/user',function(req,res){

    res.send('Got a DELETE request at /user');
});


