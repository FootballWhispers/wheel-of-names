import "./styles.css";
import Wheel from "./wheel";
import AddNames from "./addNames";
import { useEffect, useState } from "react";

export default function App() {
  const [nameList, setNameList] = useState(["Amy", "Bob", "Cindy", "Dorothy", "Randy", "Eugene", "Gregory", "Marge"]);

  const addName = (names) => {
    console.log(names);
    console.log(nameList);
    setNameList([...names]);
  };

  return (
    <div className="App">
      <div className="title">
        <div>WHEEL OR</div>
        <div className="question">?</div>
        <div>NO WHEEL</div>
      </div>
      <div className="main">
        <Wheel nameList={nameList} />
        <AddNames nameList={nameList} setNameList={addName} />
      </div>
      <div className="brand">WILLIAMS RACING</div>
    </div>
  );
}
