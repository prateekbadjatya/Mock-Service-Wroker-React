import React, {useState, useEffect} from 'react'
import './App.css';
import {setupWorker} from 'msw';

//npx msw init public --> crearte service Worker file
if (process.env.NODE_ENV === 'development') {
  const {handlers} = require('./handlers');
  const worker  = setupWorker (...handlers)
  worker.start()
}
const fetchData = async () => {
  let response = await fetch('http://localhost:3000/api/user');
  if(!response.ok) {
    throw Error('Some userful Message')
  }
  console.log(response)
  return response.json()
}
function App() {
  const [userName, setUserName] = useState('')
  const [status, setStatus] = useState('Loading')

  useEffect(()=> {
    fetchData().then(user=> {
      console.log('user', user)
      setUserName(user.username)
      setStatus('success')
    }).catch(err=>{
      setUserName('')
      setStatus('error')
    })
  }, [])
  if(status === 'Loading') {
    return <h1>Loading...</h1>
  } else if (status ==='error') {
    return <h1>Error fetching user</h1>
  } else {
    return <h1>{userName}</h1>
  }
}

export default App;
