import 'babel-polyfill';

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost:process.env.APIHOST || 'localhost',
    apiPort:process.env.APIPORT,
    app: {
        title: 'BlueOcean App'
    }
})