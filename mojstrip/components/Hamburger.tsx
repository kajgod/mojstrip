const Hamburger = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div className="open">
      <button onClick={() => setOpen(!isOpen)}>
        <div id="nav-animation" className={isOpen ? "active" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

export default Hamburger;
