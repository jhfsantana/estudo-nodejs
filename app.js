var app = require('./config/express')();
var routes = require('./app/routes/produtos')(app);

app.listen(3000, function(){
	console.log('Servidor rodando em localhost:3000');
});