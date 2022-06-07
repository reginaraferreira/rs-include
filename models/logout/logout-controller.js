const express = require("express");
const router = express.Router();

router.post('/logout', function(req, res) {
    return res.render('login', { auth: false, token: null, message: null });
});


module.exports = router;