import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  // useCallback(fn,dependencies) is used when we have to use same fucntion multiple time with cache value
  // callback is used to achieve optimisation
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@~#$%^&*[]{}?"

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    // passwordRef is used here to select text when we click on copy
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])


  // useEffect is initially use to run code as well as run function when there is change in events mentioned in array
  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-mb rounded-lg px-4
      my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" value={password} className="outline-none w-full bg-white py-1 px-3"
            placeholder='Password' readOnly ref={passwordRef}/>
            <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer" 
            onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2"> 
          <div className="flex item-center gap-x-1">
              <input type="range" min={6} max={100} value={length} className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}/>
              <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className='cursor-pointer'
            onChange={(e) => {setNumberAllowed((prev) => !prev)}}/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" className='cursor-pointer'
            onChange={(e) => {setCharAllowed((prev) => !prev)}}/>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
