import React from "react";
import Die from "./Die";

function App() {
  //create the state dice array
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    //check for winning conditions in [dice]
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]); //we need it to run every time [dice] change

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        //because i;m giving the index of the object as the id we check if it matches
        //and if it does we change its isHeld status
        return oldDice.indexOf(die) === id
          ? { ...die, isHeld: !die.isHeld }
          : die;
      })
    );
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    //creating a new array to put the random numbers
    //then we changed to an array of objects so we can have the isHeld property
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  //we change the dice array by calling the allNewDice function again
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
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
      <h1 className="title">{tenzies ? "You won!" : "Tenzies"}</h1>
      <p className="instructions">
        {tenzies
          ? ""
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
