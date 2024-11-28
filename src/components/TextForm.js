import React, {useState} from 'react'


export default function TextForm(props) {

    const handleUpClick = ()=> {
      // console.log ("Upperclick was Clicked" + text)
      let newText = text.toUpperCase();
      setText(newText)
      props.showAlert("Converted to uppercase!","success");
  }

    const handleCopy = () => {
      let text = document.getElementById('myBox')
      text.select();
      navigator.clipboard.writeText(text.value);
      props.showAlert("Text Copied","success");
    }

    const handleExtraSpace=() =>{
      let newText = text.split(/[ ]+/)
      setText (newText.join(" "))
      props.showAlert("Extra spaces Removed!","success");
    }
    
    const handleDownClick = ()=> {
      // console.log ("Lower was Clicked" + text)
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

    const getStyles = (mode) => {
      switch (mode) {
        case 'dark':
          return { backgroundColor: 'grey', color: 'white' };
        case 'red':
          return { backgroundColor: 'purple', color: 'white' };
        case 'purple':
          return { backgroundColor: 'purple', color: 'white' };
        default:
          return { backgroundColor: 'white', color: '#042743' };
      }
    };
    

  return (
    <>
    <div className='container' style={{color  : props.mode==='dark'?'white':'#042743'}}>
        <h1> {props.heading} </h1>
        <div className="mb-3">
      <textarea className="form-control" value={text} style={getStyles(props.mode)} onChange={handleOnChange} id="myBox" rows="8"/>

        </div>

        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className='btn btn-primary mx-1' onClick={handleDownClick}>Convert To LowerCase</button>
        <button className='btn btn-primary mx-1' onClick={handleClearClick}>Clear</button>
        <button className='btn btn-primary mx-1' onClick={handleReverseClick}>Reverse</button>
        <button className='btn btn-primary mx-1' onClick={capitalFirstLetter}>First Letter Reverse</button>
        <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
        <button type="submit" onClick={speak1} className="btn btn-warning mx-2 my-2" id="toggle">Speak</button>
        <button className='btn btn-primary mx-1' onClick={handleCopy}>Copy Text</button>
        <button className='btn btn-primary mx-1' onClick={handleExtraSpace}>Remove Extra Space</button>

    </div>

    <div className="container my-2" style={{color  : props.mode==='dark'?'white':'#042743'}} >
        <h1><b>Your Text Summary</b></h1>
        <p><b>{text.split(/\s+/).filter((word) => word.length > 0).length} words and {text.length} characters</b></p>
        <p> <b>{0.008 * text.split(" ").length} Minutes</b></p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter something in the text box above to preview it here"}</p>
    </div>
    </>
  )
}
