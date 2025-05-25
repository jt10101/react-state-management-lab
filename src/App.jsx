// src/App.jsx
//https://imgur.com/a/mvrw46b
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
      img: "https://i.imgur.com/SFTZZUQ.jpeg",
    },
    {
      id: 2,
      name: "Scavenger",
      price: 10,
      strength: 5,
      agility: 5,
      img: "https://i.imgur.com/tbm0UhQ.jpeg",
    },
    {
      id: 3,
      name: "Shadow",
      price: 18,
      strength: 7,
      agility: 8,
      img: "https://i.imgur.com/HyeuJUm.jpeg",
    },
    {
      id: 4,
      name: "Tracker",
      price: 14,
      strength: 7,
      agility: 6,
      img: "https://i.imgur.com/2LwingC.jpeg",
    },
    {
      id: 5,
      name: "Sharpshooter",
      price: 20,
      strength: 6,
      agility: 8,
      img: "https://i.imgur.com/uFOkbVj.jpeg",
    },
    {
      id: 6,
      name: "Medic",
      price: 15,
      strength: 5,
      agility: 7,
      img: "https://i.imgur.com/TqFezIL.jpeg",
    },
    {
      id: 7,
      name: "Engineer",
      price: 16,
      strength: 6,
      agility: 5,
      img: "https://i.imgur.com/zCJdzls.png",
    },
    {
      id: 8,
      name: "Brawler",
      price: 11,
      strength: 8,
      agility: 3,
      img: "https://i.imgur.com/Z3u8hcL.png",
    },
    {
      id: 9,
      name: "Infiltrator",
      price: 17,
      strength: 5,
      agility: 9,
      img: "https://i.imgur.com/BgccfYH.jpeg",
    },
    {
      id: 10,
      name: "Leader",
      price: 22,
      strength: 7,
      agility: 6,
      img: "https://i.imgur.com/ry1TQFd.jpeg",
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
      // Check if team array is lesser than 0, if true, remove the empty team class
      if (team.length < 1) {
        setEmptyTeam(false);
      }
      // we are appending to a new array because it is different from the other displayed array
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
    if (team.length <= 1) {
      setEmptyTeam(true);
    }
    // First, I want to add the zombie back to the fighter array
    const returnZombie = [removeZombie, ...zombieFighters];
    setZombieFighters(returnZombie);

    // Remove zombie from team array
    let returnZombieId = returnZombie[0].id;
    const newReturnTeam = team.filter((x) => x.id != returnZombieId);
    setTeam(newReturnTeam);

    // Add money back when removing members from team
    const refundMoney = money + removeZombie.price;
    setMoney(refundMoney);

    // Refunding attributes
    const teamStrength = newReturnTeam.map((x) => x.strength);
    let newReturnStrength;
    newReturnStrength = newReturnTeam
      .map((x) => x.strength)
      .reduce((accumulator, current) => accumulator + current, 0);
    setStrength(newReturnStrength);

    const teamAgility = newReturnTeam.map((x) => x.agility);
    let newReturnAgility;
    newReturnAgility = newReturnTeam
      .map((x) => x.agility)
      .reduce((accumulator, current) => accumulator + current, 0);
    setAgility(newReturnAgility);
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
          {zombieFighters
            .sort((a, b) => a.id - b.id)
            .map((zombie, id) => (
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
