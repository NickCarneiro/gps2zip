/*===========================================================================

 .----------------.  .----------------.  .----------------.  .----------------.
| .--------------. || .--------------. || .--------------. || .--------------. |
| |  ____  ____  | || |   _______    | || |  _________   | || |   ______     | |
| | |_   ||   _| | || |  |  _____|   | || | |_   ___  |  | || |  |_   _ \    | |
| |   | |__| |   | || |  | |____     | || |   | |_  \_|  | || |    | |_) |   | |
| |   |  __  |   | || |  '_.____''.  | || |   |  _|  _   | || |    |  __'.   | |
| |  _| |  | |_  | || |  | \____) |  | || |  _| |___/ |  | || |   _| |__) |  | |
| | |____||____| | || |   \______.'  | || | |_________|  | || |  |_______/   | |
| |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'

                    http://bit.ly/html5-express-boilerplate

============================================================================= */

/*===========================================================================
  TODO: JSHINT GLOBAL VARS, CONFIG, AND INSTRUCTIONS
============================================================================= */


/*===========================================================================
  DEPENDENCIES
============================================================================= */

var express = require('express'),
    inspect = require('inspect'),
    colors = require('colors'),
    sys = require('sys'),
    mime = require('mime'),
    app = module.exports = express.createServer();


/*===========================================================================
  SETTINGS
============================================================================= */

var port = 3000,
    cacheAge = 60000 * 60 * 24 * 365,
    fancyLog = true;


/*===========================================================================
  DEFAULT CONFIG
============================================================================= */

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(app.router);
  if(fancyLog)
    app.use(express.logger(''
      + '\\n'
      + '  '
      + ':date'.bold.underline
      + '\\n'
      + '\\n'
        + '  IP: '.cyan.bold
          + ' '
          + ':remote-addr'.white
      + '\\n'
        + '  Method: '.red.bold
          + ':method'.white
      + '\\n'
        + '  URL: '.blue.bold
          + ':url'.white
      + '\\n'
        + '  Status: '.yellow.bold
        + ':status'.white
      + '\\n'
        + '  User Agent: '.magenta.bold
          + ':user-agent'.white
    ));
});


/*===========================================================================
  DEVELOPMENT CONFIG
  $ node server.js
============================================================================= */

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack      : true
  }));
});


/*===========================================================================
  PRODUCTION CONFIG
  $ NODE_ENV=production node server.js
============================================================================= */

app.configure('production', function() {
  port = 8080;
  app.use(express.static(__dirname + '/public', {
    maxAge: cacheAge
  }));
  app.use(express.errorHandler());
});

/*===========================================================================
  ERROR HANDLING
============================================================================= */

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function(req, res, next){
  // the status option, or res.statusCode = 404
  // are equivalent, however with the option we
  // get the "status" local available as well
  res.render('404', {
    layout: false,
    status: 404,
    // url: req.url,
    title: '404 Error'
  });
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.render('500', {
    layout: false,
    status: err.status || 500,
    error: err,
    title: '500 Error'
  });
});


/*===========================================================================
  YOUR ROUTES
============================================================================= */

// Index
app.get('/', function(req, res) {
  res.render('index', {
    title: 'HTML5 Express Boilerplate',
    description: 'Default template for writing code quickly.'
  });
});


/*===========================================================================
  REQUIRED ROUTES
============================================================================= */

// 404 Error
app.get('/404', function(req, res, next){
  next();
});

// 403 Error
app.get('/403', function(req, res, next){
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

// 500 Error
app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});

// Always keep this route last
app.get('*', function (req, res, next) {

  /*=========================================================================
    BETTER WEBSITE EXPERIENCE FOR IE USERS
  =========================================================================== */
  var url = req.url,
      ua = req.headers['user-agent'],
      reqPath = req.url;

  if(ua && ua.indexOf('MSIE'))
    res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');

  // We don't want to send this header on _everything_
  if(reqPath.match(/\.(js|css|gif|png|jpe?g|pdf|xml|oga|ogg|m4a|ogv|mp4|m4v|webm|svg|svgz|eot|ttf|otf|woff|ico|webp|appcache|manifest|htc|crx|xpi|safariextz|vcf)$/)) {
    // TODO: https://github.com/joyent/node/blob/master/lib/http.js
    // removeHeader() should support multiple headers at once, comma separated?
    res.removeHeader('X-UA-Compatible');
    res.removeHeader('IE=Edge,chrome=1');
  }


  /*=========================================================================
    CROSS DOMAIN AJAX REQUESTS
  =========================================================================== */
  // Force the latest IE version, in cases when it may fall back to IE7 mode
  // http://github.com/rails/rails/commit/123eb25#commitcomment-118920
  // Use ChromeFrame if it's installed, for a better experience with IE folks
  // Control cross domain using CORS http://enable-cors.org
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

  /*=========================================================================
    WEB FONT ACCESS
  =========================================================================== */

  // NOTE: This has already been taken care of with CORS above
  // Allow access from all domains for webfonts.
  // Alternatively you could only whitelist your
  // subdomains like "subdomain.example.com".
  //if(reqPath.match(/\.(ttf|ttc|otf|eot|woff|font.css)$/))
  //  res.setHeader('Access-Control-Allow-Origin', '*');

  /*=========================================================================
    MIME TYPES
  =========================================================================== */
  mime.define({
    // JavaScript
    // Normalize to standard type (it's sniffed in IE anyways)
    // tools.ietf.org/html/rfc4329#section-7.2
    'application/javascript'         : ['js'],
    // Audio
    'audio/ogg'                      : ['oga', 'ogg'],
    'audio/mp4'                      : ['m4a'],
    // Video
    'video/ogg'                      : ['ogv'],
    'video/mp4'                      : ['mp4', 'm4v'],
    'video/webm'                     : ['webm'],
    // SVG
    // Required for svg webfonts on iPad
    // twitter.com/FontSquirrel/status/14855840545
    'image/svg+xml'                  : ['svg', 'svgz'],
    'gzip'                           : ['svgz'],
    // Webfonts
    'application/vnd.ms-fontobject'  : ['eot'],
    'application/x-font-ttf'         : ['ttf', 'ttc'],
    'font/opentype'                  : ['otf'],
    'application/x-font-woff'        : ['woff'],
    // Assorted types
    'image/x-icon'                   : ['ico'],
    'image/webp'                     : ['webp'],
    'text/cache-manifest'            : ['appcache', 'manifest'],
    'text/x-component'               : ['htc'],
    'application/x-chrome-extension' : ['crx'],
    'application/x-xpinstall'        : ['xpi'],
    'application/octet-stream'       : ['safariextz'],
    'text/x-vcard'                   : ['vcf']
  });

  // TODO: Allow concatenation from within specific js and css files
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L111

  // TODO: Gzip compression
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L137

  // TODO: Expires headers (for better cache control)
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L186

  // TODO: ETag removal
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L255

  // TODO: Stop screen flicker in IE on CSS rollovers
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L271

  // TODO: Cookie setting from iframes
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L286

  // TODO: Suppress or force the "www." at the beginning of URLs
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L315

  // TODO: Built-in filename-based cache busting
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L356

  // TODO: Prevent SSL cert warnings
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L376

  // TODO: UTF-8 encoding
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L411

  // TODO: Block access to "hidden" directories whose names begin with a period
  // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L442

  next();
});

/*===========================================================================
  START EXPRESS SERVER
============================================================================= */

app.listen(port);
var appPort = app.address().port + '',
    appEnv = app.settings.env.toUpperCase();

sys.puts(''
  + 'SERVER LISTENING ON PORT '.rainbow
  + " ".white.inverse
  + appPort.white.inverse
  + " ".white.inverse
  + ' IN '.rainbow
  + " ".white.inverse
  + appEnv.white.inverse
  + " ".white.inverse
  + ' MODE '.rainbow
);

