import { useEffect, useState } from "react";

export default function AddNames({ nameList, setNameList }) {
  const [newName, setNewName] = useState("");

  const remove = (name) => {
    setNameList(nameList.filter((n) => n !== name));
  };
  return (
    <div className="addNames">
      <div className="inputWrapper">
        <input
          value={newName}
          placeholder="New Name"
          type="text"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button
          disabled={newName.length === 0}
          className="addButton"
          onClick={() => {
            setNameList([...nameList, newName]);
            setNewName("");
          }}
        >
          Add
        </button>
      </div>
      <div className="names">
        {nameList.length > 0 && (
          <ul>
            {nameList.map((name, i) => (
              <div className="name" key={name}>
                <li>{name}</li>
                <button
                  className="deleteButton"
                  onClick={() => {
                    remove(name);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
