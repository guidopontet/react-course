import React from 'react';
import ReactDOM from 'react-dom';

import CounterApp from './components/CounterApp';
// import PrimerComponente from './components/PrimerComponente';

import './css/index.css';

const divRoot = document.querySelector('#root');

// ReactDOM.render(<PrimerComponente greeting='Hola Crack,'/>, divRoot);
ReactDOM.render(<CounterApp value={ 10 } />, divRoot);