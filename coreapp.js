const express = require ('express');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 3000;


app.use(express.json());


app.listen(port,function(){

    console.log('Backend Server has started at http://localhost:'+port);

});




var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use(cors(corsOptions));




// Object data structure for accounts 

const accounts = [
    {id:0001, name: 'Yoan',lastname:'Gabriele',email:'yoan.gabriele@gmail.com', activated:true},
    {id:0002, name: 'Carlos',lastname:'Garcia',email:'carlos.garcia@gmail.com', activated:false},
    {id:0003, name: 'Daniela',lastname:'Muller',email:'daniela.muller@gmail.com', activated:true},
    {id:0004, name: 'Federica',lastname:'Boticelli',email:'federica.boticelli@gmail.com', activated:true},
    {id:0005, name: 'Francisco',lastname:'Nicchitta',email:'francisco.nicchitta@gmail.com', activated:true},
    {id:0006, name: 'Denis',lastname:'Mittermayerele',email:'denis.mittermayer@gmail.com', activated:false},

];


// 1 = Super admin
// 2 = Admin
// 3 = Operator read and write
// 4 = Only read


const sytemroles = [
    {id:1, account: 0001,systemrole:1},
    {id:2, account: 0002,systemrole:2},
    {id:3, account: 0003,systemrole:1},
    {id:4, account: 0004,systemrole:3},
    {id:5, account: 0005,systemrole:1},
    {id:6, account: 0006,systemrole:4},
];




const organizations = [
    {id:1, name: 'E Wie Einfach', admins: [], agents: [], readers:[], Peers:[]},
    {id:2, name: 'ENTEGA Strom', admins: [], agents: [], readers:[], Peers:[]},
    {id:3, name: 'SimplyGreen', admins: [], agents: [], readers:[], Peers:[]},
    {id:4, name: 'Vattenfall', admins: [], agents: [], readers:[], Peers:[]},
    {id:5, name: 'Diehl Aviation', admins: [], agents: [], readers:[], Peers:[]},
    {id:6, name: 'Airbus Commercial Aircraft', admins: [], agents: [], readers:[], Peers:[]},
    {id:7, name: 'Airbus Defence and Space', admins: [], agents: [], readers:[], Peers:[]},
    {id:8, name: 'Airbus Helicopters', admins: [], agents: [], readers:[], Peers:[]},
    {id:9, name: 'ArianeGroup', admins: [], agents: [], readers:[], Peers:[]},
    {id:9, name: 'ArianeGroup', admins: [], agents: [], readers:[], Peers:[]},
    {id:10, name: 'European Space Agency', admins: [], agents: [], readers:[], Peers:[]}

]



const consortiums = [
    {
        id:1, 
        name: 'AutoKab', 
        admins: [],
        members: [

        ],
        chanels:[

        ],


    },


];





//Respond with Hello World on the homepage

app.get('/',function(req,res){

    res.send('Hello world');
});


//Respond with Arry of accounts on /api/accounts

app.get('/api/accounts',function(req,res){

    res.send(accounts);
});


//Given the account id as parameter, respond with the account details if it is found

app.get('/api/accounts/:id',function(req,res){
    
    const account = accounts.find(x=>x.id === parseInt(req.params.id))
    
    //not found 404
    if (!account) return res.status(404).send( 'The account with the given id:'+ req.params.id +' ...was not found');
    
    //found
    res.send(account);
});



//Add a new account using POST method, we need to validate the request body to be sure that the data sent inside the body is valid

app.post('/api/accounts',function(req,res){
    
    if (!req.body.name || !req.body.lastname){
        //Bad request 400
        res.status(400).send('Name and Lastname is required');
        return;
    };

    if (!req.body.email){
        req.body.email="";

    };

    const newaccount = {
        id: accounts.length + 1,
        name: req.body.name,
        lastname: req.body.lastname,
        email:req.body.email,
        activated:false
    }


    accounts.push(newaccount);

    res.send(newaccount);

});





//Given the account id as parameter, use PUT to activate an account if it is found

app.put('/api/accounts/activate/:id',function(req,res){
    
    const account = accounts.find(x=>x.id === parseInt(req.params.id))
    
    //not found 404
    if (!account) return res.status(404).send( 'The account with the given id:'+ req.params.id +' ...was not found');
    
    //found
    const index = accounts.indexOf(account);
    if (accounts[index].activated == false) { 
        accounts[index].activated = true;
        return res.status(200).send( JSON.stringify(account)  +'<br/>The account with the given id:'+ req.params.id +' ...now is activated');
    }
    if (accounts[index].activated == true) { 
         //Bad request 400
        return res.status(400).send( JSON.stringify(account)  +'<br/>The account with the given id:'+ req.params.id + ' ... was already activated, no change needs to be done');
    }
    
    
});


//Given the account id as parameter, use PUT to deactivate an account if it is found

app.put('/api/accounts/deactivate/:id',function(req,res){
    
    const account = accounts.find(x=>x.id === parseInt(req.params.id))
    
    //not found 404
    if (!account) return res.status(404).send( 'The account with the given id:'+ req.params.id +' ...was not found');
    
    //found
    const index = accounts.indexOf(account);
    if (accounts[index].activated == true) { 
        accounts[index].activated = false;
        return res.status(200).send( JSON.stringify(account)  +'<br/>The account with the given id:'+ req.params.id +' ...now is deactivated');
    }

    if (accounts[index].activated == false) { 
         //Bad request 400
        return res.status(400).send( JSON.stringify(account) +'<br/> The account with the given id:'+ req.params.id + ' ... was already deactivated, no change needs to be done');
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


