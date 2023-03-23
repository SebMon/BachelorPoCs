import React from 'react';
import './App.css';

function App() {

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.title = e.target.value;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Set the app bar text:</p>
        <input type="text" placeholder='React App' onChange={onInputChange}/>
      </header>
    </div>
  );
}

export default App;
