// Module dependencies
var express = require('express'),
    inspect = require('inspect'),
    colors = require('colors'),
    sys = require('sys'),
    app = module.exports = express.createServer();

// Settings
var port = 3000,
    cacheAge = 60000 * 60 * 24 * 365;

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
});

// Development
app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack      : true
  }));
});

// Production
app.configure('production', function() {
  port = 80;
  app.use(express.static(__dirname + '/public', {
    maxAge: cacheAge
  }));
  app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'HTML5 Express Boilerplate',
    description: 'Unicorns'
  });
});

// Keep this as the last route
app.get('*', function (req, res, next) {
  var url = req.url,
      ua = req.headers['user-agent'];
  // request latest IE engine or chrome frame
  if(ua && ua.indexOf('MSIE') && url.match(/\.html$/) || url.match(/\.htm$/))
     res.setHeader('X-UA-Compatible', "IE=Edge,chrome=1");
  // protect .files
  if(url.match(/(^|\/)\./))
     res.end("Not allowed");
  // control cross domain using CORS (http://enable-cors.org/)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  next(); // let the static server do the rest
});

// Startup
app.listen(port);
var unicorns = 'Unicorns listening on ',
    portMsg = ' port ' + app.address().port + ' ',
    envMsg = ' ' + app.settings.env + ' mode ';
sys.puts(unicorns.rainbow + portMsg.bold.magenta.inverse + ' in '.rainbow +  envMsg.bold.magenta.inverse);

