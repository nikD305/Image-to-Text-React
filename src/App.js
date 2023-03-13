import React, {useState} from 'react';
import Tesseract from 'tesseract.js';
import './App.css'

function App() {

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const image = e.target.files[0]
    setImage(image)
  }

  const handleImageToText = () => {
    setIsLoading(true); 
    Tesseract.recognize(image, "eng").then((res) => {
      setText(res.data.text);
      setIsLoading(false); 
    }).catch((err) => {
      console.log(err);
      setIsLoading(false); 
    });
  }

  return (
    <div className="container">
      <div>
        <h2>Image to Text</h2>
      </div>
      <div>
        <input type="file" onChange={handleChange} />
      </div>
      <button onClick={handleImageToText}>
        {isLoading ? 'Loading...' : 'Convert Image to Text'}
      </button>
      <p>{text}</p>
    </div>
  );
}

export default App;
