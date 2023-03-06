import React from 'react';
import logo from './logo.svg';
import './App.css';

const width = 800
const height = 400
window.resizeTo(width, height)
window.addEventListener("resize", function(){
  if(this.window.width != width || this.window.height != height) {
    window.resizeTo(width, height)
  }
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
    </div>
  );
}

export default App;
