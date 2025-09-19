import { useCallback, useState , useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8); 
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specChars, setCharacters] = useState(false);
  const [defaultPassword,setPassword] = useState("");
  
  //ref hook
  const passRef = useRef(null)


  //method for passgen
  const passGen = useCallback( () => {
    let pass = "";
    let str  = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklxcvbnm";

    if(numberAllowed) str += "1234567890";
    if(specChars) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for(let idx = 1 ; idx < length;idx++){
      let char  = Math.floor(Math.random() * str.length + 1);
      
      pass += str.charAt(char);
    }
    setPassword(pass);

  },[length,numberAllowed,specChars,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(defaultPassword)
  },[defaultPassword])


  useEffect(() => {
    passGen();
  },[length,numberAllowed,specChars,setPassword]);

  return (
    
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8  text-orange-500 bg-gray-800'>  
      <h1 className='text-white text-center my-3'>
        Password generator
      </h1>  
      <div className='flex shadow-rounded-lg overlfow mb-4'>
        
        <input 
        type = "text"
        value = {defaultPassword}
        className = 'outline-none w-full  py-1 px-3'
        placeholder = 'password'
        ref={passRef}
        readOnly
        />
        
        <button
          className='outline-none bg-blue-900 text-white px-3 py-0.5 shirnk-0'
          onClick={copyPasswordToClipboard}
          >
          copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1d'>
          <input 
            type="range" 
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(event)=>{setLength(event.target.value)}}
          />
          <label>Lenght:{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} 
          />

          <label > num?</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={specChars}
            id="numberInput"
            onChange={() => {
              setCharacters((prev) => !prev);
            }} 
          />

          <label > special characters ?</label>
        </div>

      </div>
    </div>    
    </>
  )
}

export default App
