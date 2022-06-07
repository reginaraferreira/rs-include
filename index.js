const express = require("express");
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use("/static", express.static('static'));
app.use("/scripts", express.static('scripts'));

const login = require("./models/login/login-controller");
const registration = require("./models/user-registration/registration-controller");
const profile = require("./models/profile/profile-controller");
const page = require("./models/page-registration/page-controller");
const job = require("./models/job-registration/job-controller")
const logout = require("./models/logout/logout-controller")

app.use('/', login);
app.use('/', registration);
app.use('/', profile);
app.use('/', page);
app.use('/', job);
app.use('/', logout);

app.listen(port,() => {console.log(`Servidor rodando em: http://localhost:${port}`)});