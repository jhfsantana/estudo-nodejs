
module.exports = function(app) {
	app.get('/produtos', function(request, response) {
		connectionFactory = app.infra.connectionFactory();
		dao = new app.infra.ProdutosDAO(connectionFactory);

		dao.lista(function(err, results){
			response.render('produtos/lista', {produtos: results});
		});
		connectionFactory.end();
	});
}