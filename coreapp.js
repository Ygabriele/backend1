const express = require ('express');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());


app.listen(port,function(){

    console.log('Backend Server has started at http://localhost:'+port);

});


// Object data structure for Identities 

const identities = [
    {id:1, name: 'Yoan',lastname:'Gabriele',email:'yoan.gabriele@gmail.com', activated:true},
    {id:2, name: 'Carlos',lastname:'Garcia',email:'carlos.garcia@gmail.com', activated:false},
    {id:3, name: 'Daniela',lastname:'Muller',email:'daniela.muller@gmail.com', activated:true},
    {id:4, name: 'Federica',lastname:'Boticelli',email:'federica.boticelli@gmail.com', activated:true},
    {id:5, name: 'Francisco',lastname:'Nicchitta',email:'francisco.nicchitta@gmail.com', activated:true},
    {id:6, name: 'Denis',lastname:'Mittermayerele',email:'denis.mittermayer@gmail.com', activated:false},

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
    
    //not found 404
    if (!identity) return res.status(404).send( 'The identity with the given id:'+ req.params.id +' ...was not found');
    
    //found
    res.send(identity);
});



//Add a new identity using POST method, we need to validate the request body to be sure that the data sent inside the body is valid

app.post('/api/identities',function(req,res){
    
    if (!req.body.name || !req.body.lastname){
        //Bad request 400
        res.status(400).send('Name and Lastname is required');
        return;
    };

    if (!req.body.email){
        req.body.email="";

    };

    const newIdentity = {
        id: identities.length + 1,
        name: req.body.name,
        lastname: req.body.lastname,
        email:req.body.email,
        activated:false
    }


    identities.push(newIdentity);

    res.send(newIdentity);

});





//Given the identity id as parameter, use PUT to activate an Identity if it is found

app.put('/api/identities/activate/:id',function(req,res){
    
    const identity = identities.find(x=>x.id === parseInt(req.params.id))
    
    //not found 404
    if (!identity) return res.status(404).send( 'The identity with the given id:'+ req.params.id +' ...was not found');
    
    //found
    const index = identities.indexOf(identity);
    if (identities[index].activated == false) { 
        identities[index].activated = true;
        return res.status(200).send( JSON.stringify(identity)  +'<br/>The identity with the given id:'+ req.params.id +' ...now is activated');
    }
    if (identities[index].activated == true) { 
         //Bad request 400
        return res.status(400).send( JSON.stringify(identity)  +'<br/>The identity with the given id:'+ req.params.id + ' ... was already activated, no change needs to be done');
    }
    
    
});


//Given the identity id as parameter, use PUT to deactivate an Identity if it is found

app.put('/api/identities/deactivate/:id',function(req,res){
    
    const identity = identities.find(x=>x.id === parseInt(req.params.id))
    
    //not found 404
    if (!identity) return res.status(404).send( 'The identity with the given id:'+ req.params.id +' ...was not found');
    
    //found
    const index = identities.indexOf(identity);
    if (identities[index].activated == true) { 
        identities[index].activated = false;
        return res.status(200).send( JSON.stringify(identity)  +'<br/>The identity with the given id:'+ req.params.id +' ...now is deactivated');
    }

    if (identities[index].activated == false) { 
         //Bad request 400
        return res.status(400).send( JSON.stringify(identity) +'<br/> The identity with the given id:'+ req.params.id + ' ... was already deactivated, no change needs to be done');
    }
    
    
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


