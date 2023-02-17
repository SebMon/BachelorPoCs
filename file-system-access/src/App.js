import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState()
  const [displayImage, setDisplayImage] = useState(logo)
  const [imageStyle, setImageStyle] = useState()
  
  useEffect(() => {
    if (!selectedFile) {
      setDisplayImage(undefined)
      return
    }

    const imageURL = URL.createObjectURL(selectedFile)
    setDisplayImage(imageURL)

    return () => URL.revokeObjectURL(imageURL)
  }, [selectedFile])
  

  const onSelectImage = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
    }
    setSelectedFile(e.target.files[0])
  }

  const downloadImage = e => {
    const element = document.createElement("a");
    element.href = displayImage
    element.download = selectedFile.name
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={displayImage} alt="Upload to display" className={imageStyle}/>
        <form>
          <input 
            type="file" 
            accept="image/*"
            onChange={onSelectImage}/>
        </form>
        <button onClick={downloadImage}>Download Image</button>
      </header>
    </div>
  );
}

export default App;
