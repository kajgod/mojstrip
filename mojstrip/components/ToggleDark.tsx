import { useState, useEffect } from "react";

export interface IToggleDark {
  colorMode: string;
  toggleDarkMode: () => void;
}

const ToggleDark = ({ colorMode, toggleDarkMode }: IToggleDark) => {
  const isDark = colorMode === "dark";
  return (
    <label className="toggle-dark" htmlFor="toggle">
      <div className={`toggle ${isDark ? "enabled" : "disabled"}`}>
        <span className="hidden">Toggle Dark Mode</span>
        <input
          id="toggle"
          type="checkbox"
          checked={isDark}
          onChange={toggleDarkMode}
        />
      </div>
    </label>
  );
};

export default ToggleDark;
