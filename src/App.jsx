import "./styles.css";
import Wheel from "./wheel";
import AddNames from "./addNames";
import { useState } from "react";

export default function App() {
  const [nameList, setNameList] = useState(["Name 1", "Name 2", "Name 3", "Name 4"]);
  const [showNames, setShowNames] = useState(false);

  const addName = (names) => {
    setNameList([...names]);
  };

  return (
    <div className="App">
      <div className="title">
        <img src="src/images/wonw.png" alt="wonw" />
      </div>
      <div className="main">
        <Wheel key={nameList.length} nameList={nameList} />
        <AddNames nameList={nameList} setNameList={addName} show={showNames} />
      </div>
      <div className="brand">
        <img src="src/images/williamslogo.png" alt="logo" />
      </div>
      <p className="show-text" onClick={() => setShowNames(!showNames)}>{showNames ? 'Hide' : 'Edit Names'}</p>
    </div>
  );
}
