import React from "react";
import lizard from "./assets/lizard.png";
import rock from "./assets/rock.png";
import scissor from "./assets/scissor.png";
import spock from "./assets/spock.png";
import paper from "./assets/paper.png";
import sheldon from "./assets/sheldon.png";
import logo from "./assets/logo.png";

export const Choice = ({ user, option, language, message }) => {
  const options = [
    {
      id: 0,
      name: language ? "Piedra" : "Rock",
      // emoji: "🪨",
      image: rock,
      beats: [2, 3],
      color: "#BF1F5A",
    },
    {
      id: 1,
      name: language ? "Papel" : "Paper",
      // emoji: "📄",
      image: paper,
      beats: [0, 4],
      color: "#A61B1B",
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

  const selectedOption = options.find((op) => op.id === option);

  const getClass = (id) => {
    switch (id) {
      case 0:
        return "bg-[#BF1F5A] rounded-full  h-64 w-64 flex justify-center items-center";
      case 1:
        return "bg-[#A61B1B] rounded-full h-64 w-64 flex justify-center items-center";
      case 2:
        return "bg-[#038C4C] rounded-full h-64 w-64 flex justify-center items-center";
      case 3:
        return "bg-[#103C59] rounded-full h-64 w-64 flex justify-center items-center";
      case 4:
        return "bg-[#6966A2] rounded-full h-64 w-64 flex justify-center items-center";
      default:
        "bg-[#F28627] rounded-full h-64 w-64 flex justify-center items-center";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div
        className={
          option
            ? getClass(option)
            : "bg-[#F28627] rounded-full h-64 w-64 flex justify-center items-center"
        }
      >
        {user === "Sheldon" && (
          <img
            src={selectedOption?.image || sheldon}
            className="h-36 w-36 object-contain"
          />
        )}
        {user !== "Sheldon" && (
          <img
            src={selectedOption?.image || logo}
            className="h-36 w-36 object-contain"
          />
        )}
      </div>
      <p className="h-10 lg:h-20 text-xs font-medium italic text-[#A61B1B] ">{message}</p>
    </div>
  );
};
