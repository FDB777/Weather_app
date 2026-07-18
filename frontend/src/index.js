// index.js
// This is the entry point — it takes our App component and
// mounts it inside the <div id="root"> from public/index.html

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
