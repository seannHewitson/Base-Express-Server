const express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

//  Globals
global.version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
global.root_path = path.resolve(__dirname);
global.port = 80 || process.env.port;

//  Declare Client Side Folders
app.use('/js', express.static(path.resolve(global.root_path + '/js/client')));
app.use('/css', express.static(path.resolve(global.root_path + '/css')));
app.use('/images', express.static(path.resolve(global.root_path + '/images')));

//  Routes
app.use('/', require('./Routes')());

//  Error Handling
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(`Error: ${err}`);
});

app.listen(global.port, function(){
    console.log(`Server listening on port: ${global.port}`);
});