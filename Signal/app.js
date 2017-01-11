var express = require("express");
var app     = express();
var path    = require("path");

var dblite = require("dblite");
var db = dblite("signal.db");
// db.close();




app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){

  db.query("SELECT * FROM signal_solution", function(err, rows) {
    });
  res.sendFile(path.join(__dirname+'/views/signal.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/current_settings',function(req,res){

    current_settings_db(function(current_settings){
      res.json(current_settings);
    });

});

app.get('/check_solution',function(req,res){
    check_solution(function(solution,pin){

      if (solution.toLowerCase() == req.query.userSolution.toLowerCase() ){
        res.json({"response":pin});
      }else{
        res.json({"response":"You hear nothing."});
      }
    });
});



app.get('/compare_password',function(req,res){
});


app.get('/update_clock',function(req,res){
});


function check_solution(cb){
  db.query("SELECT password,pin FROM signal_solution", function(err, rows) {
        rows.forEach(function (row) {
          pwd = row[0];
          pin = row[1];
        });
        cb(pwd,pin);
    });
}



function current_settings_db(cb){
  db.query("SELECT * FROM signal_solution", function(err, rows) {
        rows.forEach(function (row) {
          current_settings = {"first_name":row[2],"is_clock_on":row[0], "password":row[1]};
        });
        cb(current_settings)
    });


}




app.listen(3000);

console.log("Running at Port 3000");
