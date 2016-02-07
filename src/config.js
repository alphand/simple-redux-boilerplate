import 'babel-polyfill';

module.export = Object.assign({
    apiHost:process.env.APIHOST || 'localhost',
    apiPort:process.env.APIPORT,
})