import React from 'react';
import ReactDOM from 'react-dom';
import 'mobx-react-lite/batchingForReactDom';
import {BrowserRouter as Router} from 'react-router-dom';

import {App} from './components';
import {StoreContext} from './context';
import {store} from './store';
import {ErrorBoundary} from './components';

import './scss/style.scss';

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <ErrorBoundary>
            <Router>
                <App />
            </Router>
        </ErrorBoundary>
    </StoreContext.Provider>,
    document.getElementById('root')
);
