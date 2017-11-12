
module.exports = function(app) {
	app.get('/produtos', function(request, response) {
		connectionFactory = app.infra.connectionFactory();
		dao = new app.infra.ProdutosDAO(connectionFactory);

		dao.lista(function(err, results){
			response.render('produtos/lista', {produtos: results});
		});
		connectionFactory.end();
	});

	app.get('/produtos/novo', function(request, response){
		response.render('produtos/formulario');
	});

	app.post('/produtos', function(request, response){
		var produto = request.body;
		connectionFactory = app.infra.connectionFactory();
		dao = new app.infra.ProdutosDAO(connectionFactory);
		dao.salvar(produto, function(err, results){
			console.log(err);
			response.redirect('produtos');
		});
		connectionFactory.end();
	});
}