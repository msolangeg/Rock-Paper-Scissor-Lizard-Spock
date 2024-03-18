import { useState, useEffect} from 'react'


const options = [
  {id: 0, name: 'Rock', emoji:'🪨', beats:[2,3]},
  {id: 1, name: 'Paper', emoji:'📄', beats:[0,4]},
  {id: 2, name: 'Scissor', emoji:'✂️', beats:[1,3]},
  {id: 3, name: 'Lizard', emoji:'🐊', beats:[1,4]},
  {id: 4, name: 'Spock', emoji:'🖖🏻', beats:[3,0]},

];

function App() {

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  return (
    <div className='flex item-center justify-center h-screen bg-gray-600'>
      <div className='rounded-lg p-4 bg-gray-400'>
        <h1 className='text-3x1 mb-4 text-center font-bold'> ¡A jugar! </h1>
      </div>
    </div>
  )
}

export default App
