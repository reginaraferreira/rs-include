const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());

const jwt = require('jsonwebtoken');
const User = require("../user-registration/user");

var secretKey = 'INCLUD3R3DES0C14L134G0ST02022';


router.get('/', function(req, res, next){
    res.render('login', { message: null });
});

router.post('/login', async (req, res, next) => { //autenticação
    const user = await User.findOne({
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
    }
});

router.get('/esqueci_senha', function(req, res){
    res.render('esqueci_senha');
});


module.exports = router;