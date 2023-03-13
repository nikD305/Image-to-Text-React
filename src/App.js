import React, {useState} from 'react';
import Tesseract from 'tesseract.js';
import './App.css'

function App() {

  const [image, setImage] = useState(null);
  const [text, setText] = useState([]);
  const [response, setResponse] = useState([]);

 
  const handleChange = (e) =>{
  const image = e.target.files[0]
  setImage(image)
  }


  const handleImageToText = () =>{
    Tesseract.recognize(image, "eng").then((res) => {
 setText(res.data.text)
    }).catch((err)=>console.log(err))

    // const find =  Tesseract.recognize(image, "eng")
    // setText(find)
   

  }




console.log("text",text)
console.log("response",response)

  return (


  <div className="container">
  <div>
  <h2>Image to Text</h2>

  </div>
<div>
 
  <input type="file" onChange={handleChange} />
</div>



<button
 onClick={handleImageToText}
>
  Convert Image to Text
</button>


<p>{text}</p>
  </div>




  );
}

export default App;
