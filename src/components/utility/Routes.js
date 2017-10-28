import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../utility/ProtectedRoute';

import PlacesIndex from '../places/PlacesIndex';
import PlacesShow from  '../places/PlacesShow';
import PlacesNew from '../places/PlacesNew';
import PlacesEdit from '../places/PlacesEdit';
import Login from '../auth/Login';
import Register from '../auth/Register';
import NoRoute from './NoRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PlacesIndex} />
      <ProtectedRoute exact path="/places/new" component={PlacesNew} />
      <ProtectedRoute exact path="/places/:id/edit" component={PlacesEdit} />
      <Route exact path="/places/:id" component={PlacesShow} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Routes;
