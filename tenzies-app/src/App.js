import React from "react";
import Die from "./Die";

function App() {
  //create the state dice array
  const [dice, setDice] = React.useState(allNewDice());

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return oldDice.indexOf(die) === id
          ? { ...die, isHeld: !die.isHeld }
          : die;
      })
    );
  }

  function allNewDice() {
    //creating a new array to put the random numbers
    //then we changed to an array of objects so we can have the isHeld property
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  //we change the dice array by calling the allNewDice function again
  function rollDice() {
    setDice(allNewDice);
  }

  //map through the dice array to display the numbers
  const diceElements = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(index)}
    />
  ));

  return (
    <div className="main">
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </div>
  );
}

export default App;
