const http = require('http');
const SocketIo =  require('socket.io');

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

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
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api/*', (req, res) => {
    res.json({auth:true, appple:true});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const runnable = app.listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');    
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