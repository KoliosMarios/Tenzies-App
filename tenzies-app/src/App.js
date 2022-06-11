import Die from "./Die";

function App() {
  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  console.log(allNewDice());

  return (
    <div className="main">
      <div className="dice-container">
        <Die value="1" />
        <Die value="1" />
        <Die value="4" />
        <Die value="1" />
        <Die value="1" />
        <Die value="3" />
        <Die value="1" />
        <Die value="9" />
        <Die value="1" />
        <Die value="1" />
      </div>
    </div>
  );
}

export default App;
