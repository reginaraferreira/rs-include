const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());

const job = require("../job-registration/job");

router.get('/incluir_vaga', function(req, res){
    res.render('incluir_vaga');
});

router.get('/minhas_vagas_user', async (req, res) => {
    var user = req.userId;
   await job.findAll({ 
   }).then(function(cadastroVagas){
      //  console.log(cadastros);
        res.render('minhas_vagas_user', {cadastroVagas:cadastroVagas, user:user});
    })
   // res.render('minhas_vagas_user');
});

router.post('/minhas_paginas', async (req, res) => {
    var dadosVaga = req.body;
    //dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);
    await job.create(dadosVaga)
     .then(function(dadosVaga) {
         res.render('painel_vagas', {dadosVaga:dadosVaga});
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