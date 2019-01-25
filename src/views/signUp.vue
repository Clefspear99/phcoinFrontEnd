<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <v-flex xs12 sm6 md3></v-flex>
        <material-card color="green" title="Signup">
          <v-container py-0>
            <v-layout wrap>
              <v-flex >
                <v-text-field xs12 sm8 class="purple-input" label="Please Enter your username" v-model="username" />
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn class="mx-0 font-weight-light" color="success" @click="register(username)">Register</v-btn>
                <v-alert
                  v-if="this.saved"
                  :value="true"
                  type="success"
                  dismissible
                  @click="this.saved = false"
                >That username is taken, try using a different one.</v-alert>
              </v-flex>
            </v-layout>
          </v-container>
        </material-card>
      </v-flex>
      <v-flex xs12 md4></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var request = require("request");
var saved = false;
var name = "username";
var valid = "";
var privateKey = "";
var tempL = "";
var Flaeg = false;
export default {
  //
  data() {
    return {
      saved,
      username: "",
      userKey: "",
      privateKey,

    };
  },
  methods: {

    updateUserName() {},
    register(init) {
      console.log(init);
      var data = { name: init };
      var options = {
        uri: "http://localhost:3000/newuser",
        method: "POST",
        json: data
      };
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body) {
        console.log(body);
        //tempL = body;
        console.log(tempL);
        this.privateKey = body.privateKey;
        if(Flaeg === true){
          alert("This Is Your Private Key, It Is Very Important To Copy and SAVE IT\n\n" + this.privateKey);
          Flaeg = false;
        }
        else{
          Flaeg = true;
        }
        
      });

      console.log("Key s " + privateKey);
      /*request.get("http://localhost:3000/loggedIn", function(err, res, body) {
            console.log(JSON.parse(body));

        valid = body.flag;
      
      });
      console.log(valid);
      valid = valid.flag;
      if (valid === true) {
        this.$router.push("/dashboard");
      } else {
        saved = true;
      }*/
    }
  },
  beforeMount(){
    this.register("");
  }
};
</script>
