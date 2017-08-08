var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/dist')).listen(process.env.PORT || 8000, function(){
    console.log('Server running');
});
