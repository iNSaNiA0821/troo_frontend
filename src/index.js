// React Required
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Create Import File
import './main.scss';

import 'react-notifications/src/notifications.scss';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

import App from './app';
import toast, { Toaster } from 'react-hot-toast';

const Root = () =>
    <Provider store={store}>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
        />
        <App />
    </Provider>
ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();