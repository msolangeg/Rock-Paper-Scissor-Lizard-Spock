import { useState, useEffect } from "react";

// const options = [
//   { id: 0, name: "Rock", emoji: "🪨", beats: [2, 3] },
//   { id: 1, name: "Paper", emoji: "📄", beats: [0, 4] },
//   { id: 2, name: "Scissor", emoji: "✂️", beats: [1, 3] },
//   { id: 3, name: "Lizard", emoji: "🐊", beats: [1, 4] },
//   { id: 4, name: "Spock", emoji: "🖖🏻", beats: [2, 0] },
// ];

// const getResult = (userChoice, computerChoice) => {
//   if (userChoice === computerChoice) {
//     return 0;
//   }
//   if (options[userChoice].beats.includes(computerChoice)) {
//     return 1;
//   } 
//     return 2;
  
// };

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [userMessage, setUserMessage] = useState(null);
  const [computerMessage, setComputerMessage] = useState(null);
  const [language ,setLanguage] = useState(true)

  const options = [
    { id: 0, name: language ? "Piedra" : "Rock" , emoji: "🪨", beats: [2, 3] },
    { id: 1, name:language ? "Papel" : "Paper", emoji: "📄", beats: [0, 4] },
    { id: 2, name: language ? "Tijera" : "Scissor", emoji: "✂️", beats: [1, 3] },
    { id: 3, name: language ? "Lagarto" : "Lizard", emoji: "🐊", beats: [1, 4] },
    { id: 4, name:language ? "Spock" : "Spock", emoji: "🖖🏻", beats: [2, 0] },
  ];

  const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return 0;
    }
    if (options[userChoice].beats.includes(computerChoice)) {
      return 1;
    } 
      return 2;
    
  };

  const changeLanguage = () => {
    setLanguage(!language)
  }

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
       language ? `Tu has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}` : `You choice ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        language ? `Sheldon ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}` : `Sheldon choice ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
      );
    }
  }, [computerChoice]);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    setDisabled(true);

    const randomChoice = Math.floor(Math.random() * 5);

    setTimeout(() => {
      setComputerChoice(randomChoice);
    }, 1500);

    setTimeout(() => {
      setResult(getResult(choice, randomChoice));
    }, 3000);

    clearTimeout();
  };

  const reset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setUserMessage(null);
    setComputerMessage(null);
    setResult(null);
    setDisabled(false);
  };

  return (
    <div className="flex item-center justify-center h-screen bg-gray-600">
      <div className="rounded-lg p-4 bg-gray-400">
        <h1 className="text-3x1 mb-4 text-center font-bold"> ¡Bazinga! </h1>
        <button type="button" onClick={()=> changeLanguage()}>
          {language ? "Play in English" : "Jugar en Español"
          }
          </button>
        <div className="max-w-md-mx-auto">
          {options.map((option) => (
            <button
              className="px-4 py-2 m-2 text-xl font-bold text-white bg-violet-500 hover:bg-violet-700"
              key={option.id}
              disabled={disabled}
              onClick={() => handlePlay(option.id)}
              title={option.name}
            >
              {option.emoji}
            </button>
          ))}

          {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}

          {computerChoice !== null && (
            <p className="text-xl mt-4">{computerMessage}</p>
          )}

          {result !== null && (
            <div className="mt-8">
              {result === 0 && <p className="text-xl mt-4">{language ? "Empate" : "Tie" }🤷🏻‍♀️</p>}

              {result === 1 && (
                <p className="text-xl mt-4">
                  {language ? `Tu has ganado con ${options[userChoice]?.name} contra ` : `You win with ${options[userChoice]?.name} vs `}
                  {options[computerChoice]?.name} ✅
                </p>
              )}

              {result === 2 && (
                <p className="text-xl mt-4">
                  {language ? `Tu has perdido con ${options[userChoice]?.name} contra ` : `You lose with ${options[userChoice]?.name} vs `}
                  {options[computerChoice]?.name} ❎
                </p>
              )}

              <button
                className="bg-pink-500 hover:bg-pink-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-pink-700"
                onClick={reset}
              >
                {language ? "Jugar de nuevo" : "Play again"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// https://youtu.be/6YtPXjY30Qc?si=TWW0CEqCl9EZR2XW
