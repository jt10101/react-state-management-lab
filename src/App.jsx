// src/App.jsx
import { useState } from "react";
import "./App.css";

const App = () => {
  // States
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: "Survivor",
      price: 12,
      strength: 6,
      agility: 4,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png",
    },
    {
      id: 2,
      name: "Scavenger",
      price: 10,
      strength: 5,
      agility: 5,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png",
    },
    {
      id: 3,
      name: "Shadow",
      price: 18,
      strength: 7,
      agility: 8,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png",
    },
    {
      id: 4,
      name: "Tracker",
      price: 14,
      strength: 7,
      agility: 6,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png",
    },
    {
      id: 5,
      name: "Sharpshooter",
      price: 20,
      strength: 6,
      agility: 8,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png",
    },
    {
      id: 6,
      name: "Medic",
      price: 15,
      strength: 5,
      agility: 7,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png",
    },
    {
      id: 7,
      name: "Engineer",
      price: 16,
      strength: 6,
      agility: 5,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png",
    },
    {
      id: 8,
      name: "Brawler",
      price: 11,
      strength: 8,
      agility: 3,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png",
    },
    {
      id: 9,
      name: "Infiltrator",
      price: 17,
      strength: 5,
      agility: 9,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png",
    },
    {
      id: 10,
      name: "Leader",
      price: 22,
      strength: 7,
      agility: 6,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png",
    },
  ]);
  const [isemptyTeam, setEmptyTeam] = useState(true);
  const [totalStrength, setStrength] = useState(0);
  const [totalAgility, setAgility] = useState(0);

  // Event Handler Functions
  const handleAddFighter = (addZombie) => {
    if (money < addZombie.price) {
      console.log("Not enough money!");
    } else {
      // We set is empty team to false when any add button is first clicked
      setEmptyTeam(false);

      // Spread operator to create new array becuase of .push function
      // we are appending to the new array because it is different from the other displayed array
      const newteam = [addZombie, ...team];
      setTeam(newteam);
      // console.log(newteam);

      // New Array to remove selected zombie fighter
      // Since we added the new zombie to the start of the new array [newteam], we use the index 0 to identify it's key
      // We find its index in the [zombieFighters] array and filter it out
      let addZombieId = newteam[0].id;
      const newzombieFighters = zombieFighters.filter(
        (x) => x.id != addZombieId
      );
      setZombieFighters(newzombieFighters);

      // Caclulation of new money balance after minusing  price of  zombie
      const newMoney = money - addZombie.price;
      setMoney(newMoney);
      console.log("enough money"); // check for else condition

      // Adding attributes of new zombie
      const teamStrength = newteam.map((x) => x.strength);
      let newStrength;
      newStrength = newteam
        .map((x) => x.strength)
        .reduce((accumulator, current) => accumulator + current, 0);
      setStrength(newStrength);

      const teamAgility = newteam.map((x) => x.agility);
      let newAgility;
      newAgility = newteam
        .map((x) => x.agility)
        .reduce((accumulator, current) => accumulator + current, 0);
      setAgility(newAgility);
    }
  };

  const handleRemoveFighter = (removeZombie) => {
    // First, I want to add the zombie back to the fighter array
    const returnZombie = [removeZombie, ...zombieFighters];
    setZombieFighters(returnZombie);

    // Remove zombie from team array
    let returnZombieId = returnZombie[0].id;
    const newReturnTeam = team.filter((x) => x.id != returnZombieId);
    setTeam(newReturnTeam);
  };
  // Main JSX
  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Money: {money}</h2>
      <div>
        <h2>Team Strength: {totalStrength}</h2>
      </div>
      <div>
        <h2>Team Agility: {totalAgility}</h2>
      </div>
      <div>
        <h2>Team</h2>
        <p id={isemptyTeam ? "emptyteam" : "occupiedteam"}>
          Pick some team members!
        </p>
        <ul>
          {team.map((zombie, id) => (
            <li key={zombie.id}>
              <img src={zombie.img} />
              <h3>{zombie.name}</h3>
              <p>Price: {zombie.price}</p>
              <p>Strength: {zombie.strength}</p>
              <p>Agility: {zombie.agility}</p>
              <button onClick={() => handleRemoveFighter({ ...zombie })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Fighters</h2>
        <ul>
          {zombieFighters.map((zombie, id) => (
            <li key={id}>
              <img src={zombie.img} />
              <h3>{zombie.name}</h3>
              <p>Price: {zombie.price}</p>
              <p>Strength: {zombie.strength}</p>
              <p>Agility: {zombie.agility}</p>
              <button onClick={() => handleAddFighter({ ...zombie })}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
