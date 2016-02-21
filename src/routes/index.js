import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import { NotFoundView, Counter, FooView, BarView } from '../components';
import { browserHistory } from 'react-router';

import AuthApp from '../modules/auth/containers/AuthApp';
import { isLoaded as isAuthLoaded, load as loadAuth } from '../modules/auth/actions/AuthActions';

const Routes = (storeObj) => {
  const store = storeObj.store;

  const requireLogin = (nextState, replaceState, cb) => {

    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
          // oops, not logged in, so can't be here!
          replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
        <Router history={browserHistory}>
            {/* 'App' acts as a wrapper for the child components */}
            <Route path="/" component={App}>
                {/* IndexRoute is the initial component that is loaded,
                    other routes are loaded according to the component
                    property specified here */}
                <IndexRoute component={Counter}/>
                <Route path="foo" component={FooView}/>
                <Route path="bar" component={BarView}/>
                <Route path="auth" component={AuthApp} onEnter={requireLogin}/>
                <Route path="*" component={NotFoundView} />
            </Route>
        </Router>
    );
};

export default Routes;
