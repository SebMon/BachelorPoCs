import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState("Temporary text")

  async function fetchText(fileHandle) {
    setText(await (await fileHandle.getFile()).text())
  }

  useEffect(() => {
    if ('launchQueue' in window && 'files' in LaunchParams.prototype) {
      launchQueue.setConsumer((launchParams) => {
        if (!launchParams.files.length) {
          return
        }
        for (const fileHandle of launchParams.files) {
          fetchText(fileHandle)
        }
      })
    }

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {text}
        </p>
      </header>
    </div>
  );
}

export default App;
