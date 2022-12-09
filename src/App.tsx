import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <footer>
        <a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-light.svg" alt="Deploys by Netlify" /> </a>
      </footer>
    </div>
  );
}

export default App;
