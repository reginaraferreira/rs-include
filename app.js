const express = require("express");
const app = express();
const port = 8080;


const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./models/auth');
const Cadastro = require("./models/cadastro");

app.set('view engine', 'ejs');
app.use("/static", express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

var salt = bcrypt.genSaltSync(10);


app.get('/', function(req, res, next){
    res.render('login', { message: null });
});

app.get('/cadastro', function(req, res){
    res.render('cadastro');
});

app.get('/esqueci_senha', function(req, res){
    res.render('esqueci_senha');
});

app.get('/feed_noticias', eAdmin, function(req, res){
    res.render('feed_noticias');
});

app.get('/perfil', async (req, res) => {
    res.render('perfil');
});

app.get('/editar_perfil', eAdmin, function(req, res){
    res.render('editar_perfil');
});

app.get('/amigos', eAdmin, function(req, res){
    res.render('amigos');
});

app.post('/cadastro-realizado', async (req, res) => {
    var dadosUser = req.body;
    dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);

    await Cadastro.create(dadosUser)
     .then(() => {
         res.render('cadastro_realizado');
         //res.send("Cadastro realizado com sucesso!")
     }).catch(() => {
         //res.send("Erro: Cadastrado não foi realizado com sucesso!" + erro)
         return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
     })
 });


app.post('/login', async (req, res) => {
    //console.log(req.body);
    const user = await Cadastro.findOne({
        attributes: ['id', 'email', 'senha'],
        where: {
            email: req.body.email
        }
    })

    if (user === null) {
        console.log("email incorreto");
        return res.render('login', { message:"Usuário e/ou senha incorretos!"});
    };

    //senhaDigitadaPeloUsuario = bcrypt.hashSync(req.body.password, salt);
    //dadosUser.senha = await bcrypt.hash(dadosUser.senha, salt);
    
    if(!(await bcrypt.compare(req.body.password, user.senha))){
        return res.render('login', { message:"Usuário e/ou senha incorretos!"});
    } else {
        res.render('feed_noticias');
        token;
    }
    var token = jwt.sign({id: user.id}, "INCLUD3R3DES0C14L134G0ST02022", {
        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '7d' // 7 dia
    });
    console.log(token);

});

app.listen(port,() => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});