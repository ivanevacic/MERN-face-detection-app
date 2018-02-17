import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//  Import 'tachyons' CSS URL:'http://tachyons.io/'
import 'tachyons';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
