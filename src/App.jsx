import "./styles.css";
import Wheel from "./wheel";
import AddNames from "./addNames";
import { useState } from "react";
import wonw from "./images/wonw.png";
import williamslogo from "./images/williamslogo.png";

export default function App() {
  const [nameList, setNameList] = useState(["Name 1", "Name 2", "Name 3", "Name 4"]);
  const [showNames, setShowNames] = useState(false);

  const addName = (names) => {
    setNameList([...names]);
  };

  return (
    <div className="App">
      <div className="title">
        <img src={wonw} alt="wonw" />
      </div>
      <div className="main">
        <Wheel key={nameList.length} nameList={nameList} />
        <AddNames nameList={nameList} setNameList={addName} show={showNames} />
      </div>
      <div className="brand">
        <img src={williamslogo} alt="logo" />
      </div>
      <p className="show-text" onClick={() => setShowNames(!showNames)}>{showNames ? 'Hide' : 'Edit Names'}</p>
    </div>
  );
}
