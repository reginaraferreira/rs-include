var jwt = require('jsonwebtoken');
var secretKey = 'INCLUD3R3DES0C14L134G0ST02022';

module.exports = {
    verifyJWT: async function (req, res, next){ //autorização
        //const token = req.get('my_auth_token');
        //const token = req.headers['token'];
        const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU0Mzk0NDUwLCJleHAiOjE2NTQ5OTkyNTB9.94vth3433zlNUoUFYOTj18DSVmtRQvNqtJtAozJx-x0';
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
}