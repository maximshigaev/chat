import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import {observer} from 'mobx-react';

import {LoginPage} from '../';
import {MainPage} from '../';
import {SignupPage} from '../';
import {StoreContext} from '../../context';
import {Spinner} from '../';

const App = observer(() => {
    const {isUsersLoading, usersError} = useContext(StoreContext);

    if (usersError && usersError.type === `list`) {
        throw usersError.error;
    }

    if (isUsersLoading) {
        return < Spinner />;
    }

    return (
        <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} exact />
            <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupPage} exact />
            <Route path={`${process.env.PUBLIC_URL}/`} component={MainPage} />
        </Switch>
    );
});

export {App};
