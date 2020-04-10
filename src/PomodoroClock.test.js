import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroClock from './componentes/PomodoroClock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PomodoroClock />, div);
  ReactDOM.unmountComponentAtNode(div);
});
