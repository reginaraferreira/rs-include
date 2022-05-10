const jwt = require('jsonwebtoken');
const { promisify } = require('util');
//const Cadastro = require("./models/cadastro");

module.exports = {
    eAdmin: async function (req, res, next){
        //const authHeader = req.headers['x-access-token'];
        const authHeader = "1"
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUyMTAwMjMwLCJleHAiOjE2NTI3MDUwMzB9.szLYNbk6zgCx97qZNOlaRfz01V_IWHb6Z-wbmt5Wg2Y';
        console.log(authHeader);
        if(!authHeader){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token A!"
            });
        }

       // const [, token ]= authHeader.split(' ');
       // console.log("Token: " + token);

        if(!token){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página! Faltam o token B!"
            });
        }

        try{
            const decode = await promisify(jwt.verify)(token, "INCLUD3R3DES0C14L134G0ST02022");
            req.CadastroId = decode.id;
            return next();
        }catch(err){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página! Token inválido!"
            });
        }

    }
}