<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <v-flex xs12 sm6 md3></v-flex>
        <material-card color="green" title="Login">
          <v-container py-0>
            <v-layout wrap>
              <v-flex >
                <v-text-field xs12 sm8 class="purple-input" label="Please Enter your username" v-model="username" />
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn class="mx-0 font-weight-light" color="success" @click="logIn(username)">Login</v-btn>
                <v-alert
                  v-if="this.saved"
                  :value="true"
                  type="success"
                  dismissible
                  @click="this.saved = false"
                >You must enter at least a valid username</v-alert>
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
var valid = false;
var name = "username";
export default {
  //
  data() {
    return {
      saved,
      username: "",
      userKey: "",
      valid
    };
  },
  methods: {

    updateUserName() {},
    logIn(init) {
      console.log(init);
      var data = { name: init };
      var options = {
        uri: "http://localhost:3000/login",
        method: "POST",
        json: data
      };
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          valid = body.valid;
          console.log(body);
        }
      });

      if (valid === true) {
        valid = false;
        this.$router.push("/dashboard");
      } else {
        saved = true;
      }
    }
  },
  beforeMount(){
    this.logIn("somecrazyasdlfjasljsff;lkasdjsd");
  }
};
</script>
