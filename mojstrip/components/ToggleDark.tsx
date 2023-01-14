export interface IToggleDark {
  colorMode: string;
  toggleDarkMode: () => void;
}

const ToggleDark = ({ colorMode, toggleDarkMode }: IToggleDark) => {
  return (
    <label className="toggle-dark" htmlFor="toggle">
      <div className={`toggle ${colorMode == "dark" ? "enabled" : "disabled"}`}>
        <span className="hidden">Toggle Dark Mode</span>
        <input
          id="toggle"
          type="checkbox"
          checked={colorMode == "dark"}
          onChange={toggleDarkMode}
        />
      </div>
    </label>
  );
};

export default ToggleDark;
