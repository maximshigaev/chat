import React from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';

import {LoginPage} from '../';
import {MainPage} from '../';

const App = () => (
    <Switch>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} exact />
        <Route path={`${process.env.PUBLIC_URL}/`} component={MainPage} />
    </Switch>
);

export {App};
