import React from 'react';
import ReactDOM from 'react-dom';
import CounterApp from './components/CounterApp';

import './css/index.css';

const divRoot = document.querySelector('#root');

ReactDOM.render(<CounterApp value={ 10 } />, divRoot);