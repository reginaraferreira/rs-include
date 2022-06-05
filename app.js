const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Cadastro = require("./models/cadastro");
const CadastroPagina = require("./models/cadastroPagina");
const CadastroVaga = require("./models/cadastrarVaga");

app.set('view engine', 'ejs');
app.use("/static", express.static('static'));
app.use("/scripts", express.static('scripts'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

var secretKey = 'INCLUD3R3DES0C14L134G0ST02022';
var salt = bcrypt.genSaltSync(10);

app.get('/', function(req, res, next){
    res.render('login', { message: null });
});

app.get('/cadastro', function(req, res){
    res.render('cadastro', { message: null });
});

app.get('/esqueci_senha', function(req, res){
    res.render('esqueci_senha');
});

app.get('/pagina', function(req, res){
    res.render('feed_paginas');
});

app.get('/incluir_vaga', function(req, res){
    res.render('incluir_vaga');
});

app.get('/feed_noticias', async (req, res, next) =>{
    const user = await CadastroPagina.findOne({
        attributes: ['id', 'nome', 'sobrenome', 'cargo', 'instituicao', 'cidade'],
    }).then(function(cadastrosPaginas){
       //  console.log(cadastros);
         res.render('feed_noticias', {cadastrosPaginas:cadastrosPaginas});
     })
});


app.get('/perfil', verifyJWT, async (req, res, next) => {
    /*const user = await CadastroPagina.findOne({
        attributes: ['id', 'nome', 'sobrenome', 'cargo', 'instituicao', 'cidade'],
    }).then(function(user){
       //  console.log(cadastros);
         res.render('feed_noticias', {user:user});
     })*/
    await Cadastro.findOne({ where: { id: req.userId } 
    }).then(function(user){
       //  console.log(cadastros);
         res.render('perfil', {user:user});
     })
    //res.render('perfil', { auth: true, token: token });*/
});

app.get('/editar_perfil',verifyJWT, async (req, res) => {
    /*const user = await CadastroPagina.findOne({
        attributes: ['id', 'nome', 'sobrenome', 'cargo', 'instituicao', 'cidade'],
    }).then(function(user){
       //  console.log(cadastros);
         res.render('feed_noticias', {user:user});
     })*/
    await Cadastro.findOne({ where: { id: req.userId }
   }).then(function(user){
      //  console.log(cadastros);
        res.render('editar_perfil', {user:user});
    })
    
});

app.get('/minhas_paginas',verifyJWT, async (req, res) => {
    var user = req.userId;
    await CadastroPagina.findAll({ 
   }).then(function(cadastrosPaginas){
      //  console.log(cadastros);
        res.render('minhas_paginas', {cadastrosPaginas:cadastrosPaginas});
    })
});

app.get('/pagina/1', async (req, res) => {
    const pagina = await CadastroPagina.findOne({
        attributes: ['id', 'titulo', 'descricao', 'tipo', 'cidade'],
    }).then(function(cadastrosPaginas){
       //  console.log(cadastros);
         res.render('pagina_1', {cadastrosPaginas:cadastrosPaginas});
     })
});

app.get('/minhas_vagas_user', async (req, res) => {
    var user = req.userId;
   await CadastroVaga.findAll({ 
   }).then(function(cadastroVagas){
      //  console.log(cadastros);
        res.render('minhas_vagas_user', {cadastroVagas:cadastroVagas, user:user});
    })
   // res.render('minhas_vagas_user');
});

app.get('/amigos', function(req, res){
    res.render('amigos');
});

app.get('/criar_pagina', function(req, res){
    res.render('criar_pagina');
});

app.post('/minhas_paginas', async (req, res) => {
    var dadosVaga = req.body;
    //dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);
    await CadastroVaga.create(dadosVaga)
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

app.post('/cadastro-realizado', async (req, res) => {
    var dadosUser = req.body;
    dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);

    await Cadastro.create({
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
        {model:CadastroPagina, as: 'cadastroPaginas'}
    ).then(() => {
         res.render('cadastro_realizado');
         //res.send("Cadastro realizado com sucesso!")
    }).catch(() => {
         //res.send("Erro: Cadastrado não foi realizado com sucesso!" + erro)
         return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
     })

     /**
      * 
      *   try {
        const cadastro = await Cadastro.findAll({
          create: { model: cadastroPagina, as: 'cadastroPaginas' },
        });
    
        return res.status(200).json(cadastro);
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Ocorreu um erro' });
      };
      * 
      */
});

app.post('/login', async (req, res, next) => { //autenticação
    const user = await Cadastro.findOne({
        attributes: ['id', 'email', 'senha', 'nome', 'sobrenome', 'cargo', 'instituicao', 'cidade'],
        where: {
            email: req.body.email
        }
    })
    if (user === null) {
        console.log("email incorreto");
        return res.render('login', { message:"Usuário e/ou senha incorretos!"});
    };
    if(!(await bcrypt.compare(req.body.password, user.senha))){
        
        return res.render('login', { message:"Usuário e/ou senha incorretos!"});
    } else {
        const id = user.id;
        const token = jwt.sign({id}, secretKey, {
            expiresIn: '7d' // 7 dia
        });
        console.log(token);
        return res.render('feed_noticias', {tokenregi: token, user:user});
        //res.status(200).send({ auth: true, token: token }); 
    }
});


function verifyJWT(req, res, next){ //autorização
    //const token = req.get('my_auth_token');
   //const token = req.headers['token'];
  const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU0MzkyNTQ1LCJleHAiOjE2NTQ5OTczNDV9.AgxqNIomp1oug2HKjedEmo-InFPyTmOAxfd2cZNdx50';
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      //console.log("User Id: " + decoded.id)
      res.locals.authenticated = true; // <<<
        res.locals.user = decoded.user;  
      next();
    });
}

app.post('/atualizar-perfil', verifyJWT,async (req, res) => {
    var dadosUser = req.body;
    const user = await Cadastro.findByPk(req.userId);
    
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

app.post('/cadastroPagina-realizado',verifyJWT, async (req, res) => {
    //var dadosPagina = req.body;
    console.log(req.body.userId);
    await CadastroPagina.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        tipo: req.body.tipo,
        estado: req.body.estado,
        cidade: req.body.cidade,
        cadastro_id: req.userId
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

app.post('/logout', function(req, res) {
    return res.render('login', { auth: false, token: null, message: null });
});

app.listen(port,() => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});