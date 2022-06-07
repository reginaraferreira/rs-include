const express = require("express");
const router = express.Router();

const { verifyJWT } = require("../login/auth");

const User = require("../user-registration/user");
const Page = require("../page-registration/page");

router.get('/feed_noticias', async (req, res, next) =>{
    const user = await Page.findOne({
        attributes: ['id', 'nome', 'sobrenome', 'cargo', 'instituicao', 'cidade'],
    }).then(function(cadastrosPaginas){
       //  console.log(cadastros);
         res.render('feed_noticias', {cadastrosPaginas:cadastrosPaginas});
     })
});


router.get('/amigos', function(req, res){
    res.render('amigos');
});


router.get('/perfil', verifyJWT, async (req, res, next) => {
    await User.findOne({ where: { id: req.userId } 
    }).then(function(user){
         res.render('perfil', {user:user});
     })
});

router.get('/editar_perfil',verifyJWT, async (req, res) => {
    await User.findOne({ where: { id: req.userId }
   }).then(function(user){
        res.render('editar_perfil', {user:user});
    })
    
});
module.exports = router;