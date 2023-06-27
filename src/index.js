import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
const modal = document.getElementById('modal');

Modal.setAppElement(modal);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
