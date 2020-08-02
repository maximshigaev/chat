import React from 'react';
import PropTypes from 'prop-types';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.PureComponent {
    state = {
        isError: false,
    }

    static getDerivedStateFromError() {
        return {isError: true};
    }

    render() {
        if (this.state.isError) {
            return (
                <div className="error-boundary">
                    We are sorry. Application isn't available now. Please, reload the page.
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
}

export {ErrorBoundary};
