import "./switch.css"
import React, { useState } from "react";

const Switch = ({ handleDarkMode, darkMode }) => {
  //const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    //setIsActive(!isActive);
    handleDarkMode()
  };

  return (
    <div className="switch-wrapper">
      <label className={`switch ${darkMode ? "active" : ""}`}>
        <input type="checkbox" checked={darkMode} onChange={handleToggle} />
        <span className="slider">
          <div className="switch-icons">
            <span className="icon-sun">☀️</span>
            <span className="icon-moon">🌙</span>
          </div>
        </span>
      </label>
    </div>
  );
};

export default Switch;
