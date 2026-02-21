import React from 'react';
import ReactDOM from 'react-dom/client';
import { tg, isTelegram } from './telegram';
import App from './App';

if (isTelegram) {
    tg!.ready();
    tg!.expand();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
