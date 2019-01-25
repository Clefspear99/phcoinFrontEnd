<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-card
          color="green"
          title="Profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    
                    label="Username"
                    v-model="username"
                    readonly
                  />

                </v-flex>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    class="purple-input"
                    
                    label="Public Key"
                    v-model="publicKey"
                    readonly
                  />
                </v-flex>

                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    
                    label="Balance"
                    v-model="balance"
                    readonly
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="update"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
        
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="300"
          >
            <img
              src="coin\\src\\views\\539482_143805915765600_80980801_n.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO/Co-Founder</h6>
            <h4 class="card-title font-weight-light">Levi Osterman</h4>
            <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              @click="praise"
            >Praise</v-btn>
            <v-alert
            v-if="this.saved"
            :value="true"
            type="success"
            dismissible
            @click="saved = false"
          >I've been praised your majesty</v-alert>
          <v-flex>
              <v-btn
              color="primary"
              round
              class="font-weight-light"
              @click="logout"
            >logout</v-btn>
              <v-btn
              color="primary"
              round
              class="font-weight-light"
              @click="login"
            >logout</v-btn>
          </v-flex>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var request = require('request')
var requ = require('sync-request');

var saved = false;
var tems;
var publicKey;
var balance;
var name = "";
var key = "";
var bal = "";
var temp = "";

export default {
  //
  data(){
    return {
      saved: true,
      test: 'something',
      username: '',
      publicKey: '',
      balance: ''
    }
  },

  methods:{
    load(){
      
      request.get("http://localhost:3000/loggedIn", function(err, res, body) {
        console.log(body);
        if(body.flag === true){
          this.update();
        }else if(body.flag === false){
          this.$router.push("/login");
        }  
      });
      request.get("http://localhost:3000/loggedIn", function(err, res, body) {
                console.log(body);

        tems = body.flag;
      });
      console.log(tems);
        if(tems === true){
          this.update();
        }else if(tems === false){
          this.$router.push("/login");
        }  
    },
    praise(){
      if(this.saved){
        this.saved = false;
      }
      else{
        this.saved = true;
      }
    },
    login(){
      this.$router.push("/login");
    },
    logout(){
      this.$router.push("/logout");
    },
    update(){
      this.load();
      request.get("http://localhost:3000/profile", function(err, res, body) {
        //console.log(JSON.parse(body));        
        temp = JSON.parse(body);
        //console.log(temp);
        name = temp.userName;
        key = temp.userKey;
        balance = temp.balance;
      });
      console.log(temp);
      this.$data.username = name;
      this.$data.publicKey = key;
      this.$data.balance = balance;

      //console.log(temp);



    }
  },
  beforeMount(){
    this.update();
  }
}
</script>
