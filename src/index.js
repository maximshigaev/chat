import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './components';
import {StoreContext} from './context';
import {store} from './store';

import './scss/reset.scss';
import './scss/scaffolding.scss';

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('root')
);
