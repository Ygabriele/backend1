const express = require ('express');
const app = express();

const port = process.env.PORT || 3000;



app.listen(port,function(){

    console.log('Backend Server has started at http://localhost:'+port);

});


// Object data structure for Identities 

const identities = [
    {id:1, name: 'Yoan',lastname:'Gabriele',email:'yoan.gabriele@gmail.com', activated:'true'},
    {id:2, name: 'Carlos',lastname:'Garcia',email:'carlos.garcia@gmail.com', activated:'false'},
    {id:1, name: 'Daniela',lastname:'Muller',email:'daniela.muller@gmail.com', activated:'true'},
    {id:1, name: 'Federica',lastname:'Boticelli',email:'federica.boticelli@gmail.com', activated:'true'},
    {id:1, name: 'Francisco',lastname:'Nicchitta',email:'francisco.nicchitta@gmail.com', activated:'true'},
    {id:1, name: 'Denis',lastname:'Mittermayerele',email:'denis.mittermayer@gmail.com', activated:'false'},

];



//Respond with Hello World on the homepage

app.get('/',function(req,res){

    res.send('Hello world');
});


//Respond with Arry of numbers on /api/numbers

app.get('/api/numbers',function(req,res){

    res.send([1,2,3,4]);
});

//Respond to POST request on the root route (/) on the app homepage

app.post('/',function(req,res){

    res.send('Got a POST request');
});



//Respond to a PUT request on the route  user (/user) on the app

app.put('/user',function(req,res){

    res.send('Got a PUT request at /user');
});



//Respond to a DELETE request on the route  user (/user) on the app 

app.delete('/user',function(req,res){

    res.send('Got a DELETE request at /user');
});


