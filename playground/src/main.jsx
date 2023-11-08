import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'sonner';

import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
