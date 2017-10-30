
   express = require('express');
   app = express();
  var mysql = require('mysql');
   port = process.env.PORT || 5000;



  app.set('view engine', 'ejs');
  app.use(express.static('public'));


  con = mysql.createConnection({
  host: "etdq12exrvdjisg6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "owkt5vetcd0d75ux",
  password: "ocfuo632dc4y6urj",
  database:"phe73ypvqplst1jz",
  charset: 'utf8'
  });

  /*
   con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"shopping1",
  charset: 'utf8'
  });
*/
var sql1 = "SET CHARACTER SET utf8";
 con.query(sql1, function (err, result) {
 var sql = "SET SESSION collation_connection ='utf8_general_ci";
 con.query(sql,  function (err, result) {
  con.query('SET NAMES \'UTF8\'',function(err,res){

  })
 });
 });


  app.listen(port,function(){
    console.log('listening on port '+port);

  });
