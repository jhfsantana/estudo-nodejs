
module.exports = function(app) {
	app.get('/produtos', function(request, response) {
		connectionFactory = app.infra.connectionFactory();
		connectionFactory.query('select * from livros', function(err, results){
			response.render('produtos/lista', {produtos: results});
		});
		connectionFactory.end();
	});
}