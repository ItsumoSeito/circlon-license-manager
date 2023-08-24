import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './src/App';
import './public/index.css';

// eslint-disable-next-line no-undef
var root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
