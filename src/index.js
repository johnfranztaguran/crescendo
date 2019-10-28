import React from 'react';
import ReactDOM from 'react-dom';
import { AppRunner, asyncComponentLoader as asyncComponent } from 'franz-skeleton-design';
import * as serviceWorker from './serviceWorker';

const routes = [
    {
        path: '/recipe',
        component: asyncComponent(() => import('./components/Recipe')),
        isSecure: true,
        roles: []
    },
    {
        path: '/special',
        component: asyncComponent(() => import('./components/Special')),
        isSecure: true,
        roles: []
    }
]

const links = [
    {
        path: '/recipe',
        label: 'Recipe',
        leftIcon: 'dashboard'
    },
    {
        path: '/special',
        label: 'Special',
        leftIcon: 'person'
    }
]

const notifyCb = message => console.info('Notification', message);

const props = { routes, links, notifyCb }

ReactDOM.render(<AppRunner {...props} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
