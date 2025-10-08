import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Importe todos os arquivos de estilo globais aqui
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'vis-network/styles/vis-network.css';
import './index.css'; 
import './styles/global.scss'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);