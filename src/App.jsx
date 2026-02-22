import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'


//Case: Tagging a <div> element with a unique identifier ex. <div id=div0> <div id=div1> will consistiently reduce memory consumption and time to consume x bytes of memory

function App() {
  const [count, setCount] = useState(0)
  const divs = []

for(let t = 0; t < 1000; t++){
  //here is where the unique id labeling is happening - we produce a thousand counters automatically and syncronously incrementing every 10 ms. 
  //if you were to take out the unique id labeling, memory consumption would increase
  divs.push(<button id={t.toString()} onClick={() => setCount((count))}>
  count is {count}
</button>)
}

useEffect(() => {

  // Check if the count has reached the target
  if (count >= 1000) {
    return;
  }

  // Set up the interval
  const intervalId = setInterval(() => {
      // Use the functional update form

      setCount((count) => count + 1);
  }, 10); // 1000 milliseconds = 1 second

  console.log("Finished.")
  // Clean up the interval when the component unmounts or the effect re-runs
  return () => clearInterval(intervalId);
}); // Empty dependency array means the effect runs once on mount


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
       
        {divs}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}



export default App
