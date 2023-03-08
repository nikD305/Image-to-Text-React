import React, {useState} from 'react';
import Tesseract from 'tesseract.js';


function App() {

  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [response, setResponse] = useState([]);

 
  const handleChange = (e) =>{
  const image = e.target.files[0]
  setImage(image)
  }


  const handleImageToText = async () =>{
//     Tesseract.recognize(image, "eng").then((res) => {
//  setText(res.data.text)
//     }).catch((err)=>console.log(err))

    const find = await  Tesseract.recognize(image, "eng")
    setText(find.data.text)
    return find.data.text

  }


  const fetchQuestions = async (sum) => {
    
    
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'a8e75297c5msh0f90c48ec4ed7cep154f9cjsn736be15a10aa',
          'X-RapidAPI-Host': 'chatgpt-ai-chat-bot.p.rapidapi.com'
        },
        body: JSON.stringify({ "query": `solve or summarize this ${sum}` })
      };
      // fetch('https://chatgpt-ai-chat-bot.p.rapidapi.com/ask', options)
      //   .then(response => response.json())
      //   .then(response => setResponse(prevResponse => [...prevResponse, response])) 
      //   .catch(err => console.error(err));
   const data = await  fetch('https://chatgpt-ai-chat-bot.p.rapidapi.com/ask', options)
   const response = await data.json()
   setResponse(response)


  };

 
  const handleFunctions = async () =>{
 const sum = await handleImageToText()

await fetchQuestions(sum)

  }


console.log("text",text)
console.log("response",response)

  return (


  <div className="container">
  <div>
  <h2>Image to Text</h2>

  </div>
<div>
  <p>Select Image</p>
  <input type="file" onChange={handleChange} />
</div>



<button
 onClick={handleFunctions}
>
  Convert Image to Text
</button>


<p>{response.response}</p>
  </div>




  );
}

export default App;
