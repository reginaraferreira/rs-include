const express = require("express");
const router = express.Router();

const { verifyJWT } = require("../login/auth");

router.get('/criar_pagina', function(req, res){
    res.render('criar_pagina');
});

router.get('/pagina', function(req, res){
    res.render('feed_paginas');
});

router.get('/minhas_paginas',verifyJWT, async (req, res) => {
    var user = req.userId;
    await Page.findAll({ 
   }).then(function(cadastrosPaginas){
      //  console.log(cadastros);
        res.render('minhas_paginas', {cadastrosPaginas:cadastrosPaginas});
    })
});

router.get('/pagina/1', async (req, res) => {
    await Page.findOne({
         attributes: ['id', 'titulo', 'descricao', 'tipo', 'cidade'],
     }).then(function(cadastrosPaginas){
          res.render('pagina_1', {cadastrosPaginas:cadastrosPaginas});
      })
 });

 router.post('/cadastroPagina-realizado',verifyJWT, async (req, res) => {
    //var dadosPagina = req.body;
    console.log(req.body.userId);
    await Page.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        tipo: req.body.tipo,
        estado: req.body.estado,
        cidade: req.body.cidade,
        user_id: req.userId
    }).then(function(cadastrosPaginas){
         res.render('minhas_paginas', {cadastrosPaginas:cadastrosPaginas});
         //res.send("Cadastro realizado com sucesso!")
     }).catch(() => {
         //res.send("Erro: Cadastrado não foi realizado com sucesso!" + erro)
         return res.status(400).json({
            erro: true,
            mensagem: "Erro: Página não cadastrado com sucesso!"
        });
     })
});

module.exports = router;