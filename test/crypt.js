var fs =require('fs');
var opn = require('opn');
const {execSync} = require('child_process')

var userObj = "";
var resultObj = "";
var blockChain = "";
var unminedBlock = "";
var minerKey = "";
var senderPublicKey = "";
var senderPrivateKey = "";
var amount = 0;
var tempUname = "";
var receiverPublicKey = "";
var userConfig = "newuser" + "\nfalse\n" + "Ibra";
var mineConfig = "mine\n" + minerKey;
var newUserPrivateKey;
var currentUser;
var logged = false;
var resultRet = [];
var transConfig = "newtrans\n" + senderPublicKey + "\n" + senderPrivateKey + "\n" + amount + "\n" + receiverPublicKey;

module.exports = {

    getUser: function(){
        return currentUser;
    },
    readUsers: function() {
        userObj = fs.readFileSync("users.json", "utf8");
        //console.log(userObj);
        userobj = JSON.parse(userObj);
        //console.log(userObj);
        userObj = userObj[0];
        userObj = userObj.userList;
        return userobj;
        console.log(userobj.user);
        //userObj = userObj.user;
        //return userObj;
    },
    setAmount: function(inamount){
        amount = inamount;
    },
    readResult: function(){
        resultObj = fs.readFileSync("result.txt", "utf8");
        //console.log(resultObj);
        resultret = JSON.parse(resultObj);
        return resultret;
    },
    
    readChain: function(){
        blockChain = JSON.parse(fs.readFileSync("blockchain.json", "utf8")); 
        blockChain = blockChain.BlockChain.Block;
        return blockChain;
    },
    
    readUnMined: function(){
        unminedBlock = JSON.parse(fs.readFileSync("unminedBlock.json", "utf8"));
        unminedBlock = unminedBlock.Block;
        return unminedBlock;
    },

    savePrivateKey: function(first){
        var tempQ = [];
        var tempData = []
        var data = fs.readFileSync("result.txt", "utf8");
        data = JSON.parse(data);
        //console.log(data);

        tempData.push({'userName': data.username, 'privateKey': data.privatekey});
        

        data = {'userName': data.username, 'privateKey': data.privatekey};
        //console.log(data);
        if(first){
            tempQ.push(data);
           // console.log(tempQ);
            //temp = JSON.stringify(tempQ);
           // console.log(temp);
           var vals = {};
           var datar = [];
           vals.datar = tempData;
            fs.writeFileSync("privates.json", JSON.stringify(vals));
            newUserPrivateKey = data.privateKey;
        }
        else{
            var privates = fs.readFileSync("privates.json", "utf8");
            privates = JSON.parse(privates);
            privates.push(data);
            privates = JSON.stringify(privates);
            fs.writeFileSync("privates.json", privates)
            newUserPrivateKey = data.privateKey;
        }
        
    },

    mined: function(){
        //resultRet = JSON.parse(resultObj);
        //console.log(resultObj);
        resultObj = JSON.parse(resultObj);
        var n = 0;
        for(n in resultObj){
            //console.log(resultObj[n]);
            if(resultObj.status === "Success!")
            {
                return true;
            }
            else{
                return false;
            }
        }
    },
    getPrivateKey: function(){
        return newUserPrivateKey;
    },
    getPrivateKeys: function(){
       var data = fs.readFileSync("privates.json", "utf8");
       data = JSON.parse(data);
       var t = 0;
       for(t in data)
       {
           if(t.userName === tempUname){
               return t.privateKey;
           }
       }
    },
    
    newUser: function(inname){
        currentUser = inname;
        tempUname = inname;
        var cUsers = this.readUsers().userList.user;
        //console.log(cUsers);
        var k = 0;
        if((inname + "").length < 2){
            logged = false;
            return;
        }

        for(k in cUsers){
            if(cUsers[k].userName === inname)
            {
                logged = false;
                return;
            }
        }
        userConfig = "newuser" + "\nfalse\n" + inname;
        fs.writeFileSync("cppConfig.txt", userConfig);
        logged = true;
    },
     
    mine: function(){
        console.log(minerKey);
        mineConfig = "mine\n" + minerKey;
        fs.writeFileSync("cppConfig.txt", mineConfig);
    },
    
    trans: function(senderPrivate){
        console.log("'" + senderPrivate + "'");
        var tempLL = amount;
        amount = 5;
        senderPrivateKey = senderPrivate;
        transConfig = "";
        transConfig = "newtrans\n" + senderPublicKey + "\n" + senderPrivateKey + "\n" + amount + "\n" + receiverPublicKey;
        console.log(transConfig);
        fs.writeFileSync("cppConfig.txt", transConfig);
        amount = tempLL;
    },
    
    setUser: function(users, name){
        var a = 0; 
        //users = users[0];
        //users = JSON.parse(JSON.stringify(users));
        console.log(name);
        for(a in users){
            //console.log("Name: " + users[a].userName);

            if(users[a].userName === name)
            {
                var k = 0;
                for(k in users[a]){
                    //console.log(users[a][k]);
                   // console.log("K: " + k);
                    if(k === "userKey"){
                        senderPublicKey = users[a][k];
                        minerKey = users[a][k];
                        //console.log("Test Key: " + k);
                        currentUser = name;
                        logged = true;
                        return true;
                    }
                }
                return false;
            }
        }
    },
    
    setReciever: function(users, name){
        var a = 0; 
        console.log("User: " + name)
        //users = users;
        //users = JSON.parse(JSON.stringify(users));
        console.log(users);
        for(a in users){
            //console.log("Name: " + users[a].userName);
            if(users[a].userName === name)
            {
                var k = 0;
                for(k in users[a]){
                    //console.log(users[a][k]);
                   // console.log("K: " + k);
                    if(k === "userKey"){
                        receiverPublicKey = users[a][k];
                        //console.log("Test Key: " + k);

                        break;
                    }
                }
                break;
            }
        }
    },
    getProfile: function(){
        var datar = this.readUsers().userList.user;
        var k = 0;
        //console.log(datar);
        for(k in datar){
            if(datar[k].userName === currentUser) return datar[k];
            //console.log("Current User" + currentUser);
           // console.log(datar[k].userName);
        }
    },
    getLogged: function(){
        return logged;
    },
    logOut: function(){
        logged = false;
    },
    exec: function(){
        execSync('cppCD.exe');
    }
    
}



