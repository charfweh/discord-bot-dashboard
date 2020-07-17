module.exports = (app) => {
    // '/'
    app.use('/', require('./routes/index'));
    // '/authorize'
    app.use('/authorize', require('./routes/discord'));
    app.use('/manage',require('./routes/guildroutes'))
}
