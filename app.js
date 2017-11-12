var app = require('./config/express')();

app.listen(3000, function(){
	console.log('Servidor rodando em localhost:3000');
});