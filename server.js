//server.js

//set up =========================================
var express = require('express');
var app = express();                            //Create our app w/ express
var mongoose = require('mongoose');             //mongoose for mongodb
var morgan = require('morgan');                 //log requests to the console (express4)
var passport = require('passport')
var flash    = require('connect-flash');
var bodyParser = require('body-parser');        //PULL information from HTML POST
var session = require('express-session');
var methodOverride = require('method-override'); //Simulates DELETE and PUT 

//configuration ===============================================================================
//Database Configuration=================================
var uriUtil = require('mongodb-uri');
var MONGO = require('./config/database');
//load the database
var mongooseUri = uriUtil.formatMongoose(MONGO.connectionString());
//var db = mongoose.createConnection(MONGO.connectionString(), MONGO.options);
mongoose.connect(mongooseUri, MONGO.options);
var db = mongoose.connection;     
db.on('error', function(err) {
    console.log("DB connection Error: "+err);
});
db.on('open', function() {
    console.log("DB connected");
});
db.on('close', function(str) {
    console.log("DB disconnected: "+str);
});
//end of Database Configuration===================================

//basic configuration===============================================
app.use(express.static(__dirname + '/public'));  //set the static files location /public/img wil be /img for users
app.use(morgan('dev'));                                                                        app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
var port = process.env.PORT || 3000;

// required for passport
 /*
require('./config/passport')(passport); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/
//end of configuration=================================================================
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//logging to file=========================================

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
//end of logging to a file==================================

//load the routes
var apiRouter = require('./app/routes/api')(app,express);
app.use('/api',apiRouter);

    
//listen (start app with node server.js) =====================
app.listen(port);
console.log("App listening on port "+ port);