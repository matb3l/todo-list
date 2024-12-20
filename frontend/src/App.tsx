import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const res = fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
        })
        console.log(res.then((res) => res.json()))
    }, [])

    return <></>
}

export default App
