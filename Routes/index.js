var router = require('express').Router();
var path = require('path');

module.exports = function(){
    router.get('/', function(req, res){
        res.sendFile(path.join(global.root_path + '/HTML/index.html'));
    });


    return router;
}