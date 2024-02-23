import { useState } from "react";

const Cross = () => (
    <svg fill="#ffffff" height="14px" width="14px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 460.775 460.775" xml:space="preserve">
    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
      c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
      c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
      c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
      l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
      c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
    </svg>
  )

const Plus = () => (
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12H20M12 4V20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export default function AddNames({ nameList, setNameList, show }) {
  const [newName, setNewName] = useState("");

  const remove = (name) => {
    setNameList(nameList.filter((n) => n !== name));
  };
  return (
    <div className={`addNames ${show && 'show'}`}>
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
          <Plus />
        </button>
      </div>
      <div className="names">
        {nameList.length > 0 && (
          <ul>
            {nameList.map((name, i) => (
              <div className="name" key={name}>
                <li>
                  <span>{name}</span>
                  <button
                    className="deleteButton"
                    onClick={() => {
                      remove(name);
                    }}
                  >
                    <Cross />
                  </button>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
