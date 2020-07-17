const express = require('express');
const app = express();

let port = require('./config.json').port || 3000;
app.set('port', port);

const session = require('express-session');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 300000,
}));
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));
