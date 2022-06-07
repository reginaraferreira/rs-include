const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());


const User = require("../user-registration/user");
const Page = require("../page-registration/page");

const { verifyJWT } = require("../login/auth");

var salt = bcrypt.genSaltSync(10);

router.get('/cadastro', function(req, res){
    res.render('cadastro', { message: null });
});

router.post('/cadastro-realizado', async (req, res) => {
    var dadosUser = req.body;
    dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);

    await User.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        senha: req.body.senha,
        email: req.body.email,
        escolaridade: req.body.escolaridade,
        instituicao: req.body.instituicao,
        empresa: req.body.empresa,
        cargo: req.body.cargo,
        dianascimento: req.body.dianascimento,
        mesnascimento: req.body.mesnascimento,
        anonascimento: req.body.anonascimento},
        {model:Page, as: 'pages'}
    ).then(() => {
         res.render('cadastro_realizado');
    }).catch(() => {
         return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
     })

});

router.post('/atualizar-perfil', verifyJWT,async (req, res) => {
    var dadosUser = req.body;
    const user = await User.findByPk(req.userId);
    
    user.nome = dadosUser.nome;
    user.sobrenome = dadosUser.sobrenome;
    user.estado = dadosUser.estado;
    user.cidade = dadosUser.cidade;
    user.escolaridade = dadosUser.escolaridade;
    user.instituicao = dadosUser.instituicao;
    user.empresa = dadosUser.empresa;
    user.cargo = dadosUser.cargo;
    user.dianascimento = dadosUser.dianascimento;
    user.mesnascimento = dadosUser.mesnascimento;
    user.anonascimento = dadosUser.anonascimento;

    await user.save();

    res.render('perfil', {user:user});
});


module.exports = router;