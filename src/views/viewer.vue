<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <template>
          <v-flex>
          <v-btn large color="primary" round @click="logout">Logout</v-btn>
          <v-btn large color="primary" round @click="login">Login</v-btn>
          </v-flex>
          <v-card dark width="1500"
          >
            <v-img
              src="https://blog.equinix.com/wp-content/uploads/2018/06/blockchain.jpg"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Current Blocks</h3>
              </div>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="blockChain"
              id="props.item.blockNumber"
              expand
              class="elevation-1"
            >
              <template slot="items" scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <td class="text-xs">{{ props.item.blockGenTime }}</td>
                  <td class="text-xs">{{ props.item.blockNumber }}</td>
                  <td class="text-xs">{{ props.item.nonce }}</td>
                  <td class="text-xs">{{ props.item.numbOfTrans }}</td>
                  <td class="text-xs">{{ props.item.blockHash }}</td>
                  <td class="text-xs">{{ props.item.prevBlockHash }}</td>
                </tr>
              </template>
              <template slot="expand" scope="props">
                <v-card class="elevation-10">
                  <v-card-text>
                    <v-data-table
                      :headers="subHeaders"
                      :items="props.item.Transaction"
                      item-key="props.item.Transaction.senderName"
                      id="props.item.senderName"
                      hide-actions
                      class="elevation-10"
                    >
                      <template slot="items" scope="props">
                        <td class="text-xs">{{ props.item.senderName }}</td>
                        <td class="text-xs">{{ props.item.senderKey }}</td>
                        <td class="text-xs">{{ props.item.senderSig }}</td>
                        <td class="text-xs">{{ props.item.amount }}</td>
                        <td class="text-xs">{{ props.item.receiverName }}</td>
                        <td class="text-xs">{{ props.item.receiverKey }}</td>
                        <td class="text-xs">{{ props.item.time }}</td>

                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-btn large flat color="success" @click="getChain()">Show Data</v-btn>
            </v-card-actions>
          </v-card>           
        </template>
      </v-flex>

      <template></template>
    </v-layout>
  </v-container>
</template>
      
    </v-layout>
  </v-container>
</template>

<script>
var request = require("request");
var blockChain = [];
var privateKey;
var temp = [];

var headers = [
  {
    text: "BlockHash",
    value: "Block Hash"
  },
  {
    text: "GenTime",
    value: "Gen Time"
  },

  {
    text: "Nonce",
    value: "None"
  },
  {
    text: "NumberOfTransactions",
    value: "Number of Transactions"
  },
    {
    text: "BlockNumber",
    value: "Block Number"
  },
  {
    text: "PreviousBlockHash",
    value: "Previous Block Hash"
  }
];

var subHeaders = [
  {
    text: "Sender Name",
    value: "Sender Name"
  },
  {
    text: "Sender Key",
    value: "Sender Key"
  },

  {
    text: "Amount",
    value: "Amount"
  },
  {
    text: "Receiver Name",
    value: "Receiver Name"
  },
    {
    text: "Receiver Key",
    value: "Time"
  }
];

export default {
  data() {
    return {
      headers,
      blockChain,
      privateKey,
      subHeaders
    };
  },
  methods: {
    getChain() {
      request.get("http://localhost:3000/chain", function(err, res, body) {
        //console.log(body);
        temp = body;
      });
      //console.log(users);
      temp = JSON.parse(temp);
      this.blockChain = temp;
      var k = 0;
      for(k in temp) console.log(temp[k]);

    },
    login(){
      this.$router.push("/login");
    },
    logout(){
      this.$router.push("/logout");
    },
    Mine() {
      var data = { name: "siad" };
      var options = {
        uri: "http://localhost:3000/newuser",
        method: "POST",
        json: data
      };
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      });
      data = { name: "siad" };
      options = {
        uri: "http://localhost:3000/mine",
        method: "POST",
        json: data
      };
      //console.log(JSON.stringify(mainItems));
      //console.log(JSON.stringify(jsData))
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      });
    },
    Send() {},

  },
  beforeMount() {
    this.getChain();
  }
};
</script>
