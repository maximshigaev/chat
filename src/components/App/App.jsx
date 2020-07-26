import React, {useContext, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';

import {LoginPage} from '../';
import {MainPage} from '../';
import {SignupPage} from '../';
import {StoreContext} from '../../context';

const App = () => {
    const {getProfiles} = useContext(StoreContext);

    useEffect(() => getProfiles(), [getProfiles]);

    return (
        <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} exact />
            <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupPage} exact />
            <Route path={`${process.env.PUBLIC_URL}/`} component={MainPage} />
        </Switch>
    );
}

export {App};
