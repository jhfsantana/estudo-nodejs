
module.exports = function(app) {
	app.get('/produtos', function(request, response) {
		connectionFactory = app.infra.connectionFactory();
		dao = new app.infra.ProdutosDAO(connectionFactory);

		dao.lista(function(err, results){
			response.format({
				html: function() {
					response.render('produtos/lista', {produtos: results});
				},
				json: function() {
					response.json(results);
				}
			});
		});

		connectionFactory.end();
	});

	app.get('/produtos/novo', function(request, response){
		response.render('produtos/formulario',{errors: '', produto: ''});
	});

	app.post('/produtos', function(request, response){
		var produto = request.body;
		connectionFactory = app.infra.connectionFactory();
		dao = new app.infra.ProdutosDAO(connectionFactory);

		request.assert('titulo', 'Campo titulo e obrigatório!').notEmpty();
		request.assert('descricao', 'Campo titulo e descricao!').notEmpty();

		var errors = request.validationErrors();

		if(errors) {
			response.format({
				html: function() {
					response.status(400).render('produtos/formulario', {errors: errors, produto: produto});
				},
				json: function() {
					response.status(400).json(errors);
				}
			});
			return;
		}

		dao.salvar(produto, function(err, results){
			console.log(err);
			response.redirect('produtos');
		});
		connectionFactory.end();
	});
}