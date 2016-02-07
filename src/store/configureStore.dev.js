import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import clientMiddleware from './middleware/clientMiddleware';
// The reduxRouterMiddleware will look for route actions created by push, replace, etc.
// and applies them to the history.
const reduxRouterMiddleware = syncHistory(browserHistory);

/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
const logger = createLogger();

module.exports = function configureStore(initialState = undefined, client) {
    console.log('confstore', arguments);
    const finalCreateStore = compose(
        // Middleware you want to use in development:
        applyMiddleware(logger, thunk, clientMiddleware(client), reduxRouterMiddleware),
        // Required! Enable Redux DevTools with the monitors you chose
        DevTools.instrument()
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
