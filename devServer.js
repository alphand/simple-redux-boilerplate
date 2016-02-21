import appConfig from './src/config';

const http = require('http');
const SocketIo =  require('socket.io');

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const wpConfig = require('./webpack.config.dev');

const app = express();
const compiler = webpack(wpConfig);

const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: wpConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api/*', (req, res) => {
    res.json({auth:true, appple:true});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const runnable = app.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', appConfig.app.title, appConfig.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', appConfig.host, appConfig.port);
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
var messageIndex = 0;

io.on('connection', (socket) => {

    socket.emit('news', {msg:'Hello world! from socket.io server'});

    socket.on('msg', (data) => {
        data.id = messageIndex;
        messageBuffer[messageIndex % bufferSize] = data;
        messageIndex++;
        io.emit('msg', data);
    });
});
io.listen(runnable);