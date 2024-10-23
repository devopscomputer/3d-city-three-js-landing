import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos principais
import App from './App'; // Componente principal
import reportWebVitals from './reportWebVitals'; // Para métricas de performance

// Renderiza o componente App dentro do elemento com ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Função opcional para medir performance
reportWebVitals();
