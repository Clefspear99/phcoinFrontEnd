const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "air"
  });

  //Leviisaheadbanger1234

  function data () {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM DATA";
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          for(a = 0; a < fields.length; a++){
            console.log(fields.pop)
          }
        });
      });
  }



export default {
    data
}