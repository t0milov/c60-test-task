import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CanvasGame } from './canvasGame';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const render = new Promise((resolve) => {

  root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
  );
  
  setTimeout(() => {
    resolve('the game has started loading')
  }, 200)

});

render.then((value) => {
  console.log(value)
  new CanvasGame();
});
