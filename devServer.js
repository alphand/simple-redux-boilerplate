import appConfig from './src/config';

import httpProxy from 'http-proxy';
import http from 'http';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const wpConfig = require('./webpack.config.dev');

const app = express();
const compiler = webpack(wpConfig);

const targetUrl = 'http://' + appConfig.apiHost + ':' + appConfig.apiPort;
// const pretty = new PrettyError();

const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: wpConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
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