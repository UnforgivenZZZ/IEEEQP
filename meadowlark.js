//这个没用
var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

var express = require('express');
var app = express();
var os = require('os');

function getVisitIP(){
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
    	for (var k2 in interfaces[k]) {
        	var address = interfaces[k][k2];
        	if (address.family === 'IPv4' && !address.internal) {
            	addresses.push(address.address);
        	}
    	}
	}
	console.log(addresses[0]);
	return addresses[0];
}

//set up handlers view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

//use is a method to configure the 
//middleware used by the routes of the 
//Express HTTP server objec
app.get('/',function(req,res){
	// res.type('text/plain');
	// res.send('Meadoelark Travel');

	//use layout and view
	res.render('home');
	console.log("main control panel");
	getVisitIP();
});

app.get('/about', function(req,res){
	// res.type('text/plain');
	// res.send('about Meadoelark Travel');

	//use view and layout
	var randomFortune = 
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });
});

app.get('/roomInfo', function(req, res){
	res.render('roomInfo');
});

//middleware for static files: css img etc
var path = require('path');
app.use(express.static(path.join(__dirname + '/public')));

//custome 404
app.use(function(req,res){
	// res.type('text/plain');
	// res.status(404);
	// res.send('404 - NOT FOUND');
	res.status(404);
	res.render('404');
});

//custome 500 page
app.use(function(err,req,res,next){
	console.error(err.stack);
	// res.type('text/plain');
	// res.status(500);
	// res.send('500-server error');
	res.status(500);
	res.render('500');
});

var ip = process.argv[2].toString(); 
// var ip = process.argv[2].toString(); 
// var server = http.createServer(app).listen(3000, ip, function(){
// 	console.log('started on http://'+ip+':'+ app.get('port')+';ctr-c to terminate');
// });
//pass express server to io server
var io = require('socket.io').listen(app.listen(app.get('port'), ip, function(){
	console.log('started on http://'+ip+':'+ app.get('port')+';ctr-c to terminate');

}));

//data communication between server and client
var a = 1;
io.sockets.on('connection', function (socket) {
   console.log('connected '+a);
   a++; 
   socket.emit('host add', getVisitIP());

   socket.on('lights', function(msg){
   		console.log('lights '+msg);
   });

   socket.on('disconnect', function(){
   	console.log('disconnected');
   });
});














