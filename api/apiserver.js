import config from '../src/config';
import * as actions from './actions/index';
import mapUrl from 'utils/url';

const http = require('http');
const SocketIo =  require('socket.io');

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

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


app.use((req, res) => {
    const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
    const {action, params} = mapUrl(actions, splittedUrlPath)

    if (action) {
        action(req, params)
            .then((result) => {
                if (result instanceof Function){
                    result(res);
                } else {
                    res.json(result);
                }
            }, (err) => {
                if (err && err.redirect) {
                    res.redirect(err.redirect);
                } else {
                    console.error('API Error:', err);
                    res.status(err.status || 500).json(err);
                }
            })
    } else {
        res.status(404).end('NOT FOUND');
    }
});

const runnable = app.listen(config.apiPort, 'localhost', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

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