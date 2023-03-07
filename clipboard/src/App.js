import React, { useState } from 'react';
import './App.css';

document.addEventListener("copy", (e) => {
  console.log("Copied", e)
  e.preventDefault()
  e.clipboardData.setData("text/plain", "No, copy this instead")
})

document.addEventListener("cut", (e) => {
  console.log("Cut", e)
  e.preventDefault()
  e.clipboardData.setData("text/plain", "No, cut this instead")
})

function App() {
  const [displayText, setDisplayText] = useState("Try to copy, paste and cut.")
  const [text, setText] = useState("")

  document.addEventListener("paste", (e) => { //fires multiples times
    console.log("Pasted", e)
    if (e.target.id !== 'textInput') {
      e.preventDefault()
      setDisplayText("You pasted: " + e.clipboardData.getData("text/plain"))
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <p id='displayText'>
          {displayText}
        </p>
        <input id='textInput' type="text" value={text} onChange={e => setText(e.target.value)}></input>
        <button onClick={ () => {navigator.clipboard.writeText(text)}}>Copy</button>
        <button onClick={ () => {navigator.clipboard.readText().then((clipText) => setText(clipText))}}>Paste</button>
      </header>
    </div>
  );
}

export default App;
