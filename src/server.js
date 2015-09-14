/**
 * Created by nikhila on 9/3/2015.
 */
var app, bodyParser, cookieParser, dist, express, http, path, server;
express = require("express");
http = require('http');
path = require("path");
cookieParser = require("cookie-parser");
bodyParser = require("body-parser");
debug = require("debug")("react-express-template");
require("babel/register");
dist = path.join(__dirname, '/../dist');
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express["static"](dist));
app.set("port", process.env.PORT || 3003);

server = http.createServer(app);

server.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + server.address().port);
});
