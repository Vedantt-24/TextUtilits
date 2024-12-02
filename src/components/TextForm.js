import React, {useState} from 'react'


export default function TextForm(props) {

    const handleUpClick = ()=> {
      let newText = text.toUpperCase();
      setText(newText)
      props.showAlert("Converted to uppercase!","success");
  }

    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      props.showAlert("Text Copied","success");
    }

    const handleExtraSpace=() =>{
      let newText = text.split(/[ ]+/)
      setText (newText.join(" "))
      props.showAlert("Extra spaces Removed!","success");
    }
    
    const handleDownClick = ()=> {
      let newText = text.toLowerCase();
      setText(newText)
      props.showAlert("Converted to Lowercase!","success");
  }

    const handleClearClick = ()=> {
      let newText = ' ';
      setText(newText)
      props.showAlert("TextArea Cleared","success");
  }

    const speak = () => {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
  }

    const speak1 = () => {
      let msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
      const toogle = document.getElementById('toggle')
      if (toogle.textContent === "Speak") {
          toogle.innerHTML = "Stop"
      }
      else {
          toogle.innerHTML = "Speak"
          if (toogle.innerHTML === "Speak"){
              window.speechSynthesis.cancel()
          }
      }
    }

    const capitalFirstLetter = ()=>{
      let words = text.split(" ")
    let uppercaseword = ' '
      words.forEach(element => {
        uppercaseword += element.charAt(0).toUpperCase() + element.slice(1) + " "
      });
      setText(uppercaseword)
      props.showAlert("Converted First Letter to Capital","success");
    }

    const handleReverseClick = ()=> {
      setText(text.split('').reverse().join(''));
    }
        const handleOnChange = (event)=> {
            setText(event.target.value)
        }

    const [text, setText] = useState('');


    

  return (
    <>
    <div className='container' style={{color : props.mode==='dark'?'white':'#042743'}}>
        <h1 className='mb-3'> {props.heading} </h1>
        <div className="mb-3">
        <textarea
  className="form-control"
  value={text}
  onChange={handleOnChange}
  style={{
    backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', 
    color: props.mode === 'dark' ? 'white' : '#042743'
  }}
  id="myBox"
  rows="8"
/>

        </div>

        <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleDownClick}>Convert To LowerCase</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleClearClick}>Clear</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleReverseClick}>Reverse</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={capitalFirstLetter}>First Letter Reverse</button>
        <button disabled = {text.length === 0} type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
        <button disabled = {text.length === 0} type="submit" onClick={speak1} className="btn btn-warning mx-2 my-2" id="toggle">Speak</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1' onClick={handleCopy}>Copy Text</button>
        <button disabled = {text.length === 0} className='btn btn-primary mx-1' onClick={handleExtraSpace}>Remove Extra Space</button>

    </div>

    <div className="container my-2" style={{color  : props.mode==='dark'?'white':'#042743'}} >
        <h1><b>Your Text Summary</b></h1>
        <p><b>{text.split(/\s+/).filter((word) => word.length > 0).length} words and {text.length} characters</b></p>
        <p><b>{text.split().filter((word) => word.length !== 0).length} words and {text.length} characters</b></p>
        <p> <b>{0.008 * text.split(/\s+/).filter((element)=>{return element.length!== 0}).length} Minutes</b></p>
        <h2>Preview</h2>
        <p>{text.length>0 ? text:"Nothing to preview "}</p>
    </div>
    </>
  )
}
