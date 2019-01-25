<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg8
      >
        <v-btn
        @click="update"
        color="primary"
        normal
        >Update Data</v-btn>

        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">PM10 Data</h4>
          <template slot="actions">
          </template>
          
        </material-chart-card>

      </v-flex>
      <v-flex
        md12
        sm12
        lg8
      >
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">PM25 Data</h4>

        </material-chart-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
var request = require('request')

var data;
var hr = "";
var mnt = "";
var min10 = 20;
var max10 = 0;
var min25 = 20;
var max25 = 0;
var temp10max = 0;
var temp10min = 0;
var temp25max = 0;
var temp25min = 0;
var body;
var da;
var temp;
var DataR = {};
var stats = {};
var aves = [];
stats.aves = [];
var count = 0;
var hold10 = 0;
var hold25 = 0;
var btemp = false;
var MinAv10 = 0;
var MaxAv10 = 0;
var MinAv25 = 0;
var MaxAv25 = 0;

DataR.h1 = []; DataR.h2 = []; DataR.h3 = []; DataR.h4 = [];DataR.h5 = [];
DataR.h6 = []; DataR.h7 = []; DataR.h8 = []; DataR.h8 = []; DataR.h9 = [];
DataR.h10 = []; DataR.h11 = []; DataR.h12 = []; DataR.h13 = []; DataR.h14 = [];
DataR.h15 = []; DataR.h16 = []; DataR.h17 = []; DataR.h18 = []; DataR.h19 = [];
DataR.h20 = []; DataR.h21 = []; DataR.h22 = []; DataR.h23 = [];



export default {
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: [],
          series: [
            [0, 17, 7, 17, 23, 18, 150]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 150, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'PM10',
          value: 'pm10'
        },
        {
          sortable: false,
          text: 'PM25',
          value: 'pm25',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Date',
          value: 'date',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Time',
          value: 'time',
          align: 'right'
        }
      ],
      items: [
       
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    },
      dataProc () {
      request.get('http://localhost:3000',function(err,res,body1){
      if(err); //TODO: handle err
      if(res.statusCode !== 200 ); //etc
      //console.log(body1);
      da = JSON.parse(body1);
      //console.log(da);
      body = body1;
      })
      //console.log(da);
      var a = 0
      for(a in body){
          //DataR.vals.push("SOMETHING");
          try{
              //console.log("INININ");
              hr = da.vals[a].Time;
              mnt = da.vals[a].Time;
              mnt = mnt.substring(mnt.indexOf("m") - 2, mnt.indexOf("m"))
              hr = hr.substring(0,hr.indexOf("h"));
              mnt = mnt.trim();
              hr = hr.trim();
              this.items.push({"PM10": da.vals[a].PM10, "PM25": da.vals[a].PM25, "Date": da.vals[a].Date, "Time": da.vals[a].Time})
              temp = {"PM10": da.vals[a].PM10, "PM25": da.vals[a].PM25};
              //console.log(temp);
              //DataR.vals.push("SOMETHING");

              if(hr === "1")  DataR.h1.push(temp);
              if(hr === "2")  DataR.h2.push(temp);
              if(hr === "3")  DataR.h3.push(temp);
              if(hr === "4")  DataR.h4.push(temp);
              if(hr === "5")  DataR.h5.push(temp);
              if(hr === "6")  DataR.h6.push(temp);
              if(hr === "7")  DataR.h7.push(temp);
              if(hr === "8")  DataR.h8.push(temp);
              if(hr === "9")  DataR.h9.push(temp);
              if(hr === "10")  DataR.h10.push(temp);
              if(hr === "11")  DataR.h11.push(temp);
              if(hr === "12")  DataR.h12.push(temp);
              if(hr === "13")  DataR.h13.push(temp);
              if(hr === "14")  DataR.h14.push(temp);
              if(hr === "15")  DataR.h15.push(temp);
              if(hr === "16")  DataR.h16.push(temp);
              if(hr === "17")  DataR.h17.push(temp);
              if(hr === "18")  DataR.h18.push(temp);
              if(hr === "19")  DataR.h19.push(temp);
              if(hr === "20")  DataR.h20.push(temp);
              if(hr === "21")  DataR.h21.push(temp);
              if(hr === "22")  DataR.h22.push(temp);
              if(hr === "23")  DataR.h23.push(temp);

              temp10min = da.vals[a].PM10;
              if(da.vals[a].PM10 < min10) min10 = da.vals[a].PM10;
              if(da.vals[a].PM10 > max10) max10 = da.vals[a].PM10;

              temp25min = da.vals[a].PM25;
              if(temp25min < min25) min25 = temp25min;
              temp25max = da.vals[a].PM25;
              if(temp25max > max25) max25 = temp25max;

              

          }catch(err){}

      }

      this.setAves(DataR.h1);
      this.setAves(DataR.h2);
      this.setAves(DataR.h3);
      this.setAves(DataR.h4);
      this.setAves(DataR.h5);
      this.setAves(DataR.h6);
      this.setAves(DataR.h7);
      this.setAves(DataR.h8);
      this.setAves(DataR.h9);
      this.setAves(DataR.h10);
      this.setAves(DataR.h11);
      this.setAves(DataR.h12);
      this.setAves(DataR.h13);
      this.setAves(DataR.h14);
      this.setAves(DataR.h15);
      this.setAves(DataR.h16);
      this.setAves(DataR.h17);
      this.setAves(DataR.h18);
      this.setAves(DataR.h19);
      this.setAves(DataR.h20);
      this.setAves(DataR.h21);
      this.setAves(DataR.h22);
      this.setAves(DataR.h23);
      
       for(a in stats.aves)
      {
        if(stats.aves[a].PM10 < MinAv10) MinAv10 = stats.aves[a].PM10;
        if(stats.aves[a].PM10 > MaxAv10) MaxAv10 = stats.aves[a].PM10;
      }

       for(a in stats.aves)
      {
        if(stats.aves[a].PM10 < MinAv25) MinAv25 = stats.aves[a].PM10;
        if(stats.aves[a].PM10 > MaxAv25) MaxAv25 = stats.aves[a].PM10;
      }

      console.log(stats);
      //for(a in stats.aves) console.log("Average for hour # " + a + " : PM10 = " + stats.aves[a].PM10 + " PM25 = " + stats.aves[a].PM25)
      console.log("Min PM10: " + min10 + " Max PM10: " + max10 + "\nMin PM25: " + min25 + " Max PM25: " + max25);
      console.log(DataR)

    },

    setAves(arr) {
        var a = 0;
        for(a in arr){
            if(arr[a] != undefined ) {
                hold10 += arr[a].PM10; 
                hold25 += arr[a].PM25; 
                count = count + 1;
                btemp = true;
            }
        }

        btemp ? stats.aves.push({"PM10": hold10/count, "PM25": hold25/count}) :
        count = 0;
        hold10 = 0;
        hold25 = 0;
        btemp = false;
    },
    update () {
      this.dataProc ();
      var PMs = [];
      var PMTWs = [];
      var PM25s = [];
      var s = 0;
      for(s in stats.aves){
        if(stats.aves[s] != "undefined"){
          PMs.push(stats.aves[s].PM10); 
          PMTWs.push(s); 
          PM25s.push(stats.aves[s].PM25);
        } 
      } 
      this.dailySalesChart.options.low = MinAv10;
      this.dailySalesChart.options.high = MaxAv10;  
    //console.log("String " + JSON.parse(dataProc.data()));
    s = 0;
   // for(s in this.dailySalesChart.data.lables) this.dailySalesChart.data.lables.pop();
    //s = 0;
    for(s in PMTWs) this.dailySalesChart.data.labels.push(PMTWs[s]);
    this.dailySalesChart.data.series = this.dailySalesChart.data.series = [PMs];
    //this.dailySalesChart.data.labels = this.dailySalesChart.data.labels = [PMTWs];

    this.emailsSubscriptionChart.options.low = this.emailsSubscriptionChart.options.low = MinAv25;
    this.emailsSubscriptionChart.options.high = this.emailsSubscriptionChart.options.high = MaxAv25;
    //s = 0;
    //for(s in this.emailsSubscriptionChart.data.lables) this.emailsSubscriptionChart.data.lables.pop();
    s = 0;
    for(s in PMTWs) this.emailsSubscriptionChart.data.labels.push(PMTWs[s]);
   // this.emailsSubscriptionChart.data.labels = this.emailsSubscriptionChart.data.labels = [PMTWs];
    this.emailsSubscriptionChart.data.series = this.emailsSubscriptionChart.data.series = [PM25s];
    s = 0;
    //for(s in PM25s) console.log("PM25s: " + PM25s[s]);

      
    }

  }
}
</script>
