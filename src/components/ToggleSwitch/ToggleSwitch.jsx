// src/components/ToggleSwitch/ToggleSwitch.jsx
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isCelsius = currentTemperatureUnit === "C";

  return (
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle__checkbox"
        checked={isCelsius}
        onChange={handleToggleSwitchChange}
      />

      <div
        className={`toggle__slider ${
          isCelsius ? "toggle__slider_c" : "toggle__slider_f"
        }`}
      >
        {/* F / C labels on the track */}
        <div className="toggle__labels">
          <span className="toggle__label toggle__label_f">F</span>
          <span className="toggle__label toggle__label_c">C</span>
        </div>

        {/* moving black circle */}
        <div className="toggle__thumb">
          <span className="toggle__thumb-text">{isCelsius ? "C" : "F"}</span>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
