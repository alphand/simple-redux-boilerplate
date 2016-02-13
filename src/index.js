import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

import APIClient from './helpers/APIClient'

/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import './styles/main.scss';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

function initSocket() {
    const socket = io('', {path: '/ws'});
    socket.on('news', (data) => {
        console.log(data);
        socket.emit('my other event', { my: 'data from client' });
    });
    socket.on('msg', (data) => {
        console.log(data);
    });

    return socket;
}

global.socket = initSocket();

const client = new APIClient();
const store = configureStore(undefined, client);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
