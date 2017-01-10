var express = require("express");
var app     = express();
var path    = require("path");

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("signal.db");

// db.close();




app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){

  db.all("SELECT * FROM signal_solution", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.first_name, row.is_clock_on, row.password);
        })
    });
  res.sendFile(path.join(__dirname+'/views/signal.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/current_settings',function(req,res){

    current_settings_db(function(current_settings){
      res.json(current_settings);
    });

});

app.get('/compare_password',function(req,res){
});


app.get('/update_clock',function(req,res){
});


function current_settings_db(cb){
  db.all("SELECT * FROM signal_solution", function(err, rows) {
        rows.forEach(function (row) {
          current_settings = {"first_name":row.first_name,"is_clock_on":row.is_clock_on, "password":row.password};
        });
        cb(current_settings)
    });


}




app.listen(3000);

console.log("Running at Port 3000");
