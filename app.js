const express = require("express");
const app = express();
const port = 8080;
const Cadastro = require("./models/cadastro");

const bodyParser = require("body-parser");
//const { and } = require("sequelize/types");
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/static", express.static('static'));

app.use(session({
   // store: new (require('connect-pg-simple')(session))(),//usa process.env.DATABASE_URL internamente
    secret: '123',//process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }//30min
  }))

app.get('/', function(req, res, next){
   // if (req.query.fail){
   //     res.render('login', { message:"Usuário e/ou senha incorretos!"});
    //}else{
        res.render('login', { message: null });
  //  }
});

app.get('/cadastro', function(req, res){
    res.render('cadastro');
});

app.get('/esqueci_senha', function(req, res){
    res.render('esqueci_senha');
});

app.get('/feed_noticias', function(req, res){
    res.render('feed_noticias');
});

app.get('/perfil', function(req, res){
    res.render('perfil');
});

app.get('/editar_perfil', function(req, res){
    res.render('editar_perfil');
});

app.get('/amigos', function(req, res){
    res.render('amigos');
});

/*------------------------FUNÇÕES TESTES FUNCIONANDO--------------------
app.post('/login', function (req, res){
(async () => {
    const cadastro = await Cadastro.findAll({
       where:{ email: req.body.email,
            senha: req.body.password
       }
    });
    if(req.body.email == "reginara@gmail.com" && req.body.password == "123"){ 
        res.render('feed_noticias');
       console.log(cadastro);
    } else {
        res.send("Erro: Login não foi realizado" + err);
    };
})();
})
return res.rows[0];


app.post('/login', function (req, res){
    (async () => {
        const validacao_email = await Cadastro.findOne({ where: { email: req.body.email } });
        if (validacao_email === null) {
            console.log('Not found!');
          } else {
            console.log(validacao_email instanceof Cadastro); // true
            console.log(validacao_email.email); // 'My Title'
          }
          const validacao_senha = await Cadastro.findOne({ where: { senha: req.body.password } });
          if (validacao_senha === null) {
              console.log('Not found!');
            } else {
              console.log(validacao_senha instanceof Cadastro); // true
              console.log(validacao_senha.email); // 'My Title'
            }
    })();
})

app.post('/login', function (req, res){
    (async () => {
        const validacao_email = await Cadastro.findOne({ where: { email: req.body.email } }); 
        const validacao_senha = await Cadastro.findOne({ where: { senha: req.body.password } });

        const usuario_existe = (validacao_email !== null);
        const senha_existe = (Cadastro.senha == senha);

        if (usuario_existe && senha_existe) {
            console.log("aqui!");
            console.log(validacao_email instanceof Cadastro);
            console.log(validacao_senha instanceof Cadastro);
            res.render('feed_noticias');
        } else {
            console.log('Not found!');
        }
    })();
})
------------------------FIM FUNÇÕES TESTES FUNCIONANDO--------------------*/

/*------------------------fIM FUNÇÕES--------------------*/
app.post('/login', function (req, res){
    (async () => {
        const validacao_email = await Cadastro.findOne({ where: { email: req.body.email } }); 
        const validacao_senha = await Cadastro.findOne({ where: { senha: req.body.password } });

        const usuario_existe = (validacao_email !== null);
        const senha_existe = (validacao_senha !== null);

        if (usuario_existe && senha_existe) {
            console.log("aqui!");
            console.log(validacao_email instanceof Cadastro);
            console.log(validacao_senha instanceof Cadastro);
            res.render('feed_noticias');
        } else {
            res.render('login', { message:"Usuário e/ou senha incorretos!"});
        }
    })();
})

app.post('/cadastro-realizado', function(req, res){
    Cadastro.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        senha: req.body.senha,
        confsenha: req.body.confsenha,
        email: req.body.email

    }).then(function(){
        res.render('cadastro_realizado');
        //res.send("Cadastro realizado com sucesso!")
    }).catch(function(erro){
        res.send("Erro: Cadastrado não foi realizado com sucesso!" + erro)
    })
   // res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})


app.listen(port,() => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});