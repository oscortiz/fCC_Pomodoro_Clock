import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';
import PomodoroClock from './componentes/PomodoroClock';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<PomodoroClock />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
