import { useState, useEffect } from "react";
import lizard from "./assets/lizard.png";
import rock from "./assets/rock.png";
import scissor from "./assets/scissor.png";
import spock from "./assets/spock.png";
import paper from "./assets/paper.png";
import group from "./assets/group.png";
import { Choice } from "./Choice";
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
  const [language, setLanguage] = useState(true);

  const options = [
    {
      id: 0,
      name: language ? "Piedra" : "Rock",
      // emoji: "🪨",
      image: rock,
      beats: [2, 3],
    },
    {
      id: 1,
      name: language ? "Papel" : "Paper",
      // emoji: "📄",
      image: paper,
      beats: [0, 4],
    },
    {
      id: 2,
      name: language ? "Tijera" : "Scissor",
      // emoji: "✂️",
      image: scissor,
      beats: [1, 3],
    },
    {
      id: 3,
      name: language ? "Lagarto" : "Lizard",
      // emoji: "🐊",
      image: lizard,
      beats: [1, 4],
    },
    {
      id: 4,
      name: language ? "Spock" : "Spock",
      // emoji: "🖖🏻",
      image: spock,
      beats: [2, 0],
    },
  ];

  const results = JSON.parse(localStorage.getItem("gameResults"));

  const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      results.ties = results.ties + 1;
      localStorage.setItem("gameResults", JSON.stringify(results));
      return 0;
    }
    if (options[userChoice].beats.includes(computerChoice)) {
      results.player = results.player + 1;
      localStorage.setItem("gameResults", JSON.stringify(results));

      return 1;
    }
    results.sheldon = results.sheldon + 1;
    localStorage.setItem("gameResults", JSON.stringify(results));

    return 2;
  };

  const changeLanguage = () => {
    setLanguage(!language);
  };

  useEffect(() => {
    if (userChoice !== null) {
      setUserMessage(
        language
          ? `Tu has elegido ${options[userChoice]?.name}`
          : `You choice ${options[userChoice]?.name}`
      );
    }
  }, [userChoice]);

  useEffect(() => {
    if (computerChoice !== null) {
      setComputerMessage(
        language
          ? `Sheldon ha elegido ${options[computerChoice]?.name}`
          : `Sheldon choice ${options[computerChoice]?.name}`
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

  useEffect(() => {
    // Me traigo los resultados con parse y envio resultado con stringify
    const results = JSON.parse(localStorage.getItem("gameResults"));

    // chequeo si hay resultados para no sobreescribir el estado y sino envio todos en 0
    if (!results) {
      // console.log('entro')
      localStorage.setItem(
        "gameResults",
        JSON.stringify({
          player: 0,
          sheldon: 0,
          ties: 0,
        })
      );
    }
  }, []);
  const getClass = (id) => {
    switch (id) {
      case 0:
        return "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center bg-[#BF1F5A] hover:bg-[#8D0C3C] rounded-full ";
      case 1:
        return "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center bg-[#A61B1B] hover:bg-[#811515] rounded-full ";
      case 2:
        return "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center  bg-[#038C4C] hover:bg-[#01562E] rounded-full ";
      case 3:
        return "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center  bg-[#103C59] hover:bg-[#08263A] rounded-full ";
      case 4:
        return "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center  bg-[#6966A2] hover:bg-[#4E4C77] rounded-full ";
      default:
        "h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center bg-[#F28627] hover:bg[#CA6F1F] rounded-full";
    }
  };

  return (
    <div 
    className="flex flex-col item-center justify-start h-auto  bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFE5DC] via-[#EE9777] to-[#F25D27] pt-4 lg:px-24">
      <div className="flex justify-end px-4 lg:px-0">

        <button 
        className="bg-[#3d3b66] hover:bg-[#103C59] text-white font-normal text-xs py-2 px-4 mt-4 border-b-4 border-[#103C59] rounded-full "
        type="button"
        onClick={() => changeLanguage()}>
          {language ? "Play in English" : "Jugar en Español"}
        </button>
      </div>
      <div 
      className="p-4 flex flex-col justify-center items-center gap-4" 
      >
        {/* <h1 className="text-3x1 mb-4 text-center font-bold"> ¡Bazinga! </h1>
         */}
         <img src={group} className="w-[200px] lg:w-[400px]" margin={0}  />
         
        <div className="flex flex-col gap-8">      
         
          <div className="h-auto lg:h-96">
                    <div className="h-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
                      <Choice 
                        user={language ? 'Jugador' : "Player"}
                        option={userChoice}
                        language
                        message={userMessage}
                      />
                      <img/>
                      <Choice 
                        user="Sheldon"
                        option={computerChoice}
                        language
                        message={computerMessage}
                        />
                    </div>
          </div>
          <div>
          {result !== null && (
            <div className=" h-5 lg:h-10 text-xs font-medium italic text-white flex justify-center items-center">
              {result === 0 && (
                <p className="text-xl">{language ? "Empate" : "Tie"}🤷🏻‍♀️</p>
              )}

              {result === 1 && (
                <p className="text-xl mt-4">
                  {language
                    ? `Tu has ganado con ${options[userChoice]?.name} contra `
                    : `You win with ${options[userChoice]?.name} vs `}
                  {options[computerChoice]?.name} ✅
                </p>
              )}

              {result === 2 && (
                <p className="text-xl mt-4">
                  {language
                    ? `Tu has perdido con ${options[userChoice]?.name} contra `
                    : `You lose with ${options[userChoice]?.name} vs `}
                  {options[computerChoice]?.name} ❌
                </p>
              )}
            </div>
          )}
          </div>

          <div className="flex justify-around lg:items-center flex-wrap gap-4 lg:gap-8">
          {options.map((option) => (
            <button
              // className="px-8 py-8 m-4 text-xl font-bold text-white bg-violet-500 hover:bg-violet-700 rounded-full"
              className={getClass(option.id)}
              key={option.id}
              disabled={disabled}
              onClick={() => handlePlay(option.id)}
              title={option.name}
            >
              <img
                src={option.image}
               
                style={{ objectFit: "cover", width: 40, height:40}}
              />
            </button>
          ))}
          </div>


        </div>
        <div>
          {result !== null && (
            <p
            className="bg-[#F28627]  text-white font-semibold py-2 px-4 rounded-full "
            >
              {language
                ? `Resultados de la partida: Jugador: ${results.player} - Sheldon: ${results.sheldon} - Empates: ${results.ties}`
                : `Game results: Player: ${results.player} - Sheldon: ${results.sheldon} - Ties: ${results.ties}`}
            </p>
          )}
        </div>
        {result !== null && (
          <button
            className="bg-[#A61B1B] hover:bg-[#811515] text-white font-semibold py-2 px-4 mt-4 border-b-4 border-[#811515] animate-pulse rounded-full "
            onClick={reset}
          >
            {language ? "Jugar de nuevo" : "Play again"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
