
const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
var cry = require( './crypt')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



//values = JSON.parse(values);
var temp;

app.use(cors());

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "*")

    next();
});

/*function data(){

    cry.newUser("sasa");
    cry.exec();
    console.log(cry.readUsers().userList.user)

    
    cry.readUsers();
    cry.setUser(cry.readUsers().userList.user, "sasa");
    cry.mine();
    cry.exec();
    
    cry.setReciever(cry.readUsers().userList.user,"ibra");
    cry.setAmount(10);
    cry.trans("76b682d1ea0e9682c586ae6c484bcae22304ca9f36ff4ddef36ca14f207af7f2")
    cry.exec();
    console.log(cry.readUsers().userList.user);
}*/


function newUser(inname){
    cry.newUser(inname);
    if(cry.getLogged()){
        cry.exec();
        cry.savePrivateKey(true);
    }

}



function mine(inMinerName){
    console.log(inMinerName)
    if((inMinerName + "").length < 3){
        return;
    }
    cry.readUsers();
    cry.setUser(cry.readUsers().userList.user, inMinerName);
    cry.mine();
    cry.exec();
    cry.readResult();
}

function transact(inRecieverName, inRecieverKey, inSenderName){
    cry.readUsers();
    cry.setUser(cry.readUsers().userList.user, inSenderName);
    cry.setReciever(cry.readUsers().userList.user, inRecieverName);
    cry.setAmount(10);
    cry.trans(inRecieverKey)
    cry.exec();
    console.log(cry.readUsers().userList.user);
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/newuser', (req, res) => { newUser(req.body.name), res.send({privateKey:cry.getPrivateKey()})});
app.post('/mine', (req, res) => { 
    if(cry.getLogged()){
    mine(req.body.name), res.send({Mined: cry.mined()});
    }
    else{
        res.send({Mined: false});
    }
});
app.get('/chain', (req, res) => { if(cry.getLogged()){
    res.send(cry.readChain())
} 
});
app.get('/users', (req, res) => { 
    if(cry.getLogged()){
        res.send(cry.readUsers().userList.user);
    } });
app.post('/login', (req, res) => { 
    if(cry.setUser(cry.readUsers().userList.user, req.body.name)){
        //console.log(cry.readUsers().userList.user, req.body.name);
        res.send({"valid": true})
    }
    else{
        console.log(req.body.name);
        //console.log(cry.setUser(cry.readUsers().userList.user, req.body.name))
        res.send({"valid": false})
    }

});

app.get('/profile', (req, res) => {
    if(cry.getLogged()){
        res.send(cry.getProfile())
    } });
app.get('/loggedIn', (req, res) => {res.send({"flag": cry.getLogged()})});
app.get('/logout', (req, res) => {cry.logOut(), res.send({"log": cry.getLogged()})});
app.post('/send', (req, res) => {
    console.log("Executed");
    console.log(req.body.name + "\n" + req.body.key);
    if(cry.getLogged()){
        cry.setReciever(cry.readUsers().userList.user, req.body.name);
        cry.trans(req.body.key);
        cry.exec();        
    }
});


