import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('Initializing Prime House Builders application...');

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('React application mounted successfully.');
  } catch (error) {
    console.error('Failed to mount React application:', error);
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
        overlay.style.display = 'block';
        overlay.innerHTML += '<br><strong>Mount Error:</strong> ' + error;
    }
  }
} else {
  console.error("Critical Error: Target container 'root' not found in DOM.");
}