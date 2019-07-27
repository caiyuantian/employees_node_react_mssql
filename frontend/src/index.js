import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Employee from './components/employees';
import ChangeEmployee from './components/changeEmployee';
import DisplayEmployee from './components/displayEmployee';
import CreateEmployee from './components/createEmployee';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
            <Route path="/employees" component={Employee} />
            <Route path="/createEmployee" component={CreateEmployee} />
            <Route path="/changeEmployee/:id" component={ChangeEmployee} />
            <Route path="/employee/:id" component={DisplayEmployee} />
        </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
