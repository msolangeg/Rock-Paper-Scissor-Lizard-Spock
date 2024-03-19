import { useState, useEffect} from 'react'


const options = [
  {id: 0, name: 'Rock', emoji:'🪨', beats:[2,3]},
  {id: 1, name: 'Paper', emoji:'📄', beats:[0,4]},
  {id: 2, name: 'Scissor', emoji:'✂️', beats:[1,3]},
  {id: 3, name: 'Lizard', emoji:'🐊', beats:[1,4]},
  {id: 4, name: 'Spock', emoji:'🖖🏻', beats:[3,0]},

];

const getResult = (userChoice, computerChoice) => {
  if(userChoice === computerChoice){
    return 0;
  }
  if(options[userChoice].beats.includes(computerChoice)) {
    return 1;
  } 
  else{ 
    return 2;
}}



function App() {

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);

  useEffect(()=> {
    if(userChoice != null){
      setUserMessage(`Tu has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}` );
    }
  }, [userChoice])

  useEffect(()=> {
    if(computerChoice != null){
      setUserMessage(`Sheldon ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}` );
    }
  },[computerChoice])

  
  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true)

    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(()=> {
      setComputerChoice(randomChoice);
    },1500);

    setTimeout(()=> {
      setResult(getResult(choice.randomChoice));
    },3000);

      clearTimeout();
  }

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  



  return (
    <div className='flex item-center justify-center h-screen bg-gray-600'>
      <div className='rounded-lg p-4 bg-gray-400'>
        <h1 className='text-3x1 mb-4 text-center font-bold'> ¡Bazinga! </h1>
        <div className='max-w-md-mx-auto'>
          {options.map(option => (
            <button
            className='px-4 py-2 m-2 text-xl font-bold text-white bg-violet-500'
            key={option.id}
            disabled={disabled}
            onClick={() => handlePlay(option.id)}
            title={option.name}
            >
              {option.emoji}
            </button>
          ))}
          
          {userChoice != null && (
            <p className='text-xl mt-4'>{userMessage}</p>
          )}
          
          {computerChoice != null && (
            <p className='text-xl mt-4'>{computerMessage}</p>
          )}

          {result != null && (
            <div className='mt-8'>
              {result === 0 && <p className='text-xl mt-4'>Empate 🤷🏻‍♀️</p>}

              {result === 1 && (
              <p className='text-xl mt-4'>Tu has ganado con {options[userChoice]?.name} contra {''}{options[computerChoice]?.name} ✅
              </p>
              )}

              {result === 2 && (
              <p className='text-xl mt-4'>Tu has perdido con {options[userChoice]?.name} contra {''}{options[computerChoice]?.name} ❎
              </p>
              )}
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                onClick={reset}
              >
              Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
