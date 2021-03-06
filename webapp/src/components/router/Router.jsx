import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Benchmark from '../benchmark';
import Results from '../results';
import NotFound from '../notFound';
import { ROUTES } from '../../constants';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={ROUTES.home}>
            <Redirect to={ROUTES.benchmark} />
          </Route>
          <Route exact path={ROUTES.benchmark}>
            <Benchmark />
          </Route>
          <Route exact path={ROUTES.results}>
            <Results />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
