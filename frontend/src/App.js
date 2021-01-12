import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [distance, setDistance] = useState('')
  const [myDistance, setMyDistance] = useState('')

  const calculateDistace = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5500/", {
      address: address1,
      address2: address2,
    })
      .then(function (response) {
        console.log(response.data.distance);
        setDistance(response.data.distance)
      })
      .catch(function (error) {
        // setLogginError(error.message)
        console.log(error.message)
      });
  };

  useEffect(()=>{
    setMyDistance(distance)
  },[myDistance, distance])

  return (
    <div className="App">
      <div className="container mt-16 flex items-center flex-col">
        <form className="shadow w-5/6 p-4 bg-gray-800 text-gray-200" onSubmit={calculateDistace}>
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="address">Address 1</label>
            <input
              type="text"
              className="border w-full bg-gray-700 border-gray-700 rounded outline-none p-2 w-5/6"
              id="address"
              name="address"
              placeholder="First Address"
              required
              onChange={e => setAddress1(e.target.value)}
            />
            <small id="address" className="text-gray-400">Will Calculate the distance between this address and
        the one below</small>
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              className="border w-full border-gray-700 bg-gray-700 rounded outline-none p-2 mb-3 w-5/6"
              id="address2"
              name="address2"
              placeholder="Second Address"
              required
              onChange={e => setAddress2(e.target.value)}
            />
          </div>
          <button type="submit" className="p-2 bg-blue-700 outline-none  hover:bg-blue-800 rounded">Calculate</button>
        </form>
        <div className="bg-gray-800 mt-16 rounded w-5/6 p-4 flex flex-col items-center">
          {myDistance ? (<p className="text-gray-200 text-xl text-center">{myDistance}</p>): (<p className="text-gray-200 text-xl text-center">No Distance Calculated</p>)}
        </div>
      </div>

    </div>
  );
}

export default App;
