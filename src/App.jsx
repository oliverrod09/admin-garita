import { useState } from 'react'
import { Button } from "@material-tailwind/react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scanner from './components/Scanner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button>Hola</Button>
    <div className='w-6/12'>
<Scanner></Scanner>
    </div>
      
    </>
  )
}

export default App
