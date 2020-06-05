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
    {id:3, name: 'Daniela',lastname:'Muller',email:'daniela.muller@gmail.com', activated:'true'},
    {id:4, name: 'Federica',lastname:'Boticelli',email:'federica.boticelli@gmail.com', activated:'true'},
    {id:5, name: 'Francisco',lastname:'Nicchitta',email:'francisco.nicchitta@gmail.com', activated:'true'},
    {id:6, name: 'Denis',lastname:'Mittermayerele',email:'denis.mittermayer@gmail.com', activated:'false'},

];



//Respond with Hello World on the homepage

app.get('/',function(req,res){

    res.send('Hello world');
});


//Respond with Arry of identities on /api/identities

app.get('/api/identities',function(req,res){

    res.send(identities);
});


//Given the identity id as parameter, respond with the identity details if it is found

app.get('/api/identities/:id',function(req,res){
    
    const identity = identities.find(x=>x.id === parseInt(req.params.id))
    
    //not found
    if (!identity) return res.status(404).send( 'The identity with the given id:'+ req.params.id +' ...was not found');
    
    //found
    res.send(identity);
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


