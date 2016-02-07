import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router'
import clientMiddleware from './middleware/clientMiddleware';
const reduxRouterMiddleware = syncHistory(browserHistory);




module.exports = function configureStore(initialState, client) {
    const finalCreateStore = compose(
        applyMiddleware(thunk, clientMiddleware(client), reduxRouterMiddleware)
    )(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  return store;
};
