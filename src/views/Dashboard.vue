<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <template>
          <v-card dark width="1000">
            <v-img
              src="https://www.sciencenews.org/sites/default/files/2016/09/main/articles/090816_ls_brain-training_free.jpg"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Users</h3>
              </div>
            </v-card-title>
            <v-data-table xs12 sm6 offset-sm3 :headers="headers" :items="users" @click="update">
              <template slot="items" slot-scope="props">
                <td class="text-xs">{{ props.item.userKey }}</td>
                <v-tooltip bottom>
                  <span slot="activator">{{ props.header.text }}</span>
                  <span>{{ props.header.value }}</span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs">{{ props.item.name }}</td>
                  <td class="text-xs">{{ props.item.key }}</td>
                  <td class="text-xs">{{ props.item.balance }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn large flat color="success" @click="update()">Show Data</v-btn>
            </v-card-actions>
          </v-card>
          
        </template>
        
      </v-flex>
      <v-card dark width="710" height="440">
            <v-card-title primary-title>
              <div>
                <h2 class="headline mb-0">
                  {{this.currentUser}}
                </h2>
                <h3 class="headline mb-0">My Balance</h3>
                <v-btn color="primary" block large v-model="this.currentBalance" icon round><v-icon large>mdi-atom</v-icon>{{this.currentBalance}}</v-btn>
                <v-text-field width="500" outline background-color="primary"  v-model="recipient" label="Please enter the receipient's name" />
                <v-text-field width="500" outline background-color="primary"  v-model="privateKey" label="Please enter your private key" />

              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn large color="success" round @click="Mine()">Mine</v-btn>
              <v-btn large color="success" round @click="getBalance">Update Balance</v-btn>
            <v-btn large color="success" round @click="Send()">Send</v-btn>
            <v-btn large color="primary" round @click="logout">Logout</v-btn>
            <v-btn large color="primary" round @click="login">Login</v-btn>

            </v-card-actions>

          </v-card>
      <v-flex md12 sm12 lg8></v-flex>
      <template></template>
    </v-layout>
  </v-container>
</template>
      
    </v-layout>
  </v-container>
</template>

<script>
var request = require("request");
var users = [];
var blockChain;
var temp = [];
var currentUser;
var tempK;

var headers = [
  {
    text: "Name",
    value: "Name"
  },
  {
    text: "Public Key",
    value: "Public Key"
  },
  {
    text: "Balance",
    value: "Balance"
  }
];

export default {
  data() {
    return {
      headers,
      users,
      blockChain,
      privateKey: "Your private key",
      currentBalance: 0,
      currentUser,
      recipient: "Recipient's name",

      
    };
  },
  methods: {
    created(){
      this.getBalance();
    },
    update() {
      request.get("http://localhost:3000/users", function(err, res, body) {
        //console.log(body);
        temp = body;
      });
      //console.log(users);
      temp = JSON.parse(temp);
      console.log(temp);
      var s;
      var y;
      var t;
      var m;
      //users = users.userList.user;
      var k = 0;
      k = 0;
      for (k in temp) {
        s = temp[k].userName;
        y = temp[k].userKey;
        t = temp[k].balance;
        console.log(t);
        users.push({ name: s, key: y, balance: t });
      }
      
    },
    getBalance(){
      request.get("http://localhost:3000/profile", function(err, res, body) {
        //console.log(JSON.parse(body));        
        tempK = JSON.parse(body);
        //console.log(temp);
        this.$data.currentBalance = tempK.balance;
        this.$data.currentUser = tempK.userName;

      });
      request.get("http://localhost:3000/profile", function(err, res, body) {
        //console.log(JSON.parse(body));        
        tempK = JSON.parse(body);
        console.log(temp);
        this.$data.currentBalance = tempK.balance;
        this.$data.currentUser = tempK.userName;

      });
      this.$data.currentBalance = tempK.balance;
      this.$data.currentUser = tempK.userName;

    },
    Mine(){
        var data = {"name": currentUser}
        var options = {
        uri: 'http://localhost:3000/mine',
        method: 'POST',
        json: data
      }
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body){
        if(!error && response.statusCode == 200){
          //console.log(body);
        }
      })
    },
    Send(){
      console.log(this.recipient + "\n" + this.privateKey);
        var data = {"name": this.recipient, "key": this.privateKey}
        var options = {
        uri: 'http://localhost:3000/send',
        method: 'POST',
        json: data
      }
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body){
        if(!error && response.statusCode == 200){
          //console.log(body);
        }
      })
    },
    logout(){
        request.get("http://localhost:3000/logout", function(err, res, body) {
      });
      this.$router.push("/login");
    },
    login(){
      this.$router.push("/login");
    }
  },
  beforeMount() {
    this.update();
    this.getBalance();

  }
};
</script>
